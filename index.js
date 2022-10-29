const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Message, MessageFlags, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder, ButtonStyle, SlashCommandSubcommandGroupBuilder } = require('discord.js');
const { createThread } = require('./functions/threadCreator.js');
const { makeButtons } = require('./functions/roleButtons.js');
const { createRoleMenu } = require('./functions/roleMenus.js');
const { movieRequestModal } = require('./functions/movieRequestModal.js');
let { formButton } = require('./commands/event-request')
const dotenv = require('dotenv');
const { clientId, logChannelId, autoRoleChannelId, roleManagerButton, modId, movieRequest } = require('./config.js');

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// global variables used by movie request form
client.unix = Math.floor(Date.now() / 1000);
client.formArr = [];

// global variables used by movie progress command
client.movieStartTime = client.unix;
client.movieEndTime = client.unix;


// Retrieve commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const validCommands = [];
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	validCommands.push(command.data.name)
	client.commands.set(command.data.name, command);
}

// Retrieve events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


client.on('interactionCreate', async interaction => {
	const logChannel = await client.channels.fetch(logChannelId);
	try{
		// Slash commands
		if (interaction.isCommand()) {
			const command = client.commands.get(interaction.commandName);
			if (!(command) || !(validCommands.includes(command.data.name))) return;

			try {
				await command.execute(client, interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: '<a:aWrong:978722165933359174> There was an error while executing this command.\nPlease contact <@295227446981033984>.', ephemeral: true });
				await logChannel.send(`<@295227446981033984> A command error occurred.\n\`\`\`\n${error}\`\`\``)
			};
		};

		// Button interactions
		if (interaction.isButton()) {
			makeButtons(interaction);

			if (interaction.customId === 'manage-roles') {
				console.log(`Role manager: ${interaction.user.tag} used manage-roles command`)
				client.commands.get('manage-roles').execute(interaction)
					.catch((error) => console.error(error))
			};

			// Movie request handling
			if (interaction.customId === 'movieFormButton') {
				const timeNow = Math.floor(Date.now() / 1000);
				console.log(`Movie request: ${interaction.user.tag} clicked movie form button at ${timeNow}`);

				// Disable request button
				// if current unix time is greater than end unix time
				if (timeNow > client.unix) {
					const msg = interaction.message.content;
					formButton = new ActionRowBuilder();
					formButton.addComponents(
						new ButtonBuilder()
							.setCustomId('movieFormButton')
							.setLabel('Request a movie')
							.setEmoji('🍿')
							.setDisabled(true)
							.setStyle(ButtonStyle.Success),
					);

					await interaction.update({content: `${msg}\n\nThis week's movie request form is closed. Check back soon for next week's request form.`, components: [formButton]});
					console.log(`Movie request: ${interaction.user.tag}'s submission closed the movie request form at ${timeNow}`)	
				} else if (client.formArr.includes(interaction.user.id)) {
					console.log(`Movie request: ${interaction.user.tag} has already submitted movie request`)
					// if user id is already in array of id's, prevent them from submitting again
					await interaction.reply({ content: '<a:aWrong:978722165933359174> It looks like you have already submitted a movie night request for this week. Please try again next week or contact a moderator if you think this is a mistake.', ephemeral: true });					
				} else {
					console.log(`Movie request: ${interaction.user.tag} was shown the movie request form at ${timeNow}`)
					movieRequestModal(interaction)
						.catch((error) => console.error(error));
				}
			};
		};

		// Select menu interactions
		if (interaction.isSelectMenu()) {
			createRoleMenu(interaction);
		};

		if (interaction.isModalSubmit()) {
			if (interaction.customId === 'movieModal') {
				const submissionChnl = await client.channels.fetch(movieRequest.submissionLogChannelId);
				const submission = interaction.fields.getTextInputValue('movieRequest');
				client.formArr.push(interaction.user.id); // add user ID to array, used to check duplicate submissions
				await submissionChnl.send(`${interaction.user} submitted a movie request: ${submission}`);
				await interaction.reply({ content: '<a:aRight:978722165832695849> Your movie request was received!', ephemeral: true });
			}
		}
	} catch (error) {
		console.error(error);
		await logChannel.send(`<@295227446981033984> An interaction error occurred.\n\`\`\`\n${error}\`\`\``)
	}
});


client.on('messageCreate', async message => {
	const logChannel = await client.channels.fetch(logChannelId);
	try{
		createThread(message);

		if ((message.content.toLowerCase() === '!rolemanager') && (message.member.roles.cache.has(modId))) {
			console.log(`Role manager: ${message.author.tag} initiated rolemanager command`)
			const roleButton = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('manage-roles')
						.setLabel(roleManagerButton.label)
						.setEmoji(roleManagerButton.emoji)
						.setStyle(roleManagerButton.style),
				);
			await message.channel.send({ content: roleManagerButton.content, components: [roleButton] });
			await message.delete();
			}

		if ((message.editable) && (message.channel.id === autoRoleChannelId) && (message.author.id === clientId)) {
			const roleButton = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('manage-roles')
						.setLabel(roleManagerButton.label)
						.setEmoji(roleManagerButton.emoji)
						.setStyle(roleManagerButton.style),
				);
			await message.edit({ components: [roleButton] })
			console.log(`Role manager: get roles button added to message ${message.id}`)
		};

		// Display movie progress
		if (message.content === '!progress') {
			console.log(`Movie progress: ${message.author.tag} initiated movie progress command`);
			const now = Math.floor(Date.now() / 1000);

			// Checks if event has started/ended to determine if progress command can be used
			if (now > client.movieEndTime) {
				message.channel.send('There is no movie event happening right now.');
				return;
			} else if (now < client.movieStartTime) {
				message.channel.send(`<:PepePopcorn:834556626345787462> The movie event starts <t:${client.movieStartTime}:R>.`);
				return;
			};

			// To get 2 digits of accurary, multiply by 100 before rounding then divide by 100 after rounding
			const progress = Math.round((now - client.movieStartTime) / (client.movieEndTime - client.movieStartTime) * 100 * 100) / 100;
			message.channel.send(`The movie began <t:${client.movieStartTime}:R>\nThe movie ends <t:${client.movieEndTime}:R>\nThe movie is **${progress}%** complete.`);
		}

		const matches = ['G', 'Ĝ', 'Ğ', 'Ģ', 'Ġ', 'Д', 'Г']
		if ((message.channel.id === '778325316015882322' || message.channel.id === '779555811923591190')) {
			// To do: Create new module for G checking; Handle message editing

			// switch (message.content) {
			// 	case 'g':
			// 		message.react('834556611543564378');
			// 		break;
			// 	case 'G':
			// 	case 'Ĝ':
			// 	case 'Ğ':
			// 	case 'Ģ':
			// 	case 'Ġ':
			// 	case 'Д':
			// 	case 'Г':
			// 		message.react('976178632458395728');
			// 		break;
			// 	default:
			// 		for (let i in matches) {
			// 			if (message.content.includes(matches[i])) {
			// 				message.react('976178632458395728');
			// 			};
			// 		};
			// }
			
			if (message.content === 'G') {
				message.react('💩')
			} else if ((message.content === 'g')) {
				message.react('834556611543564378')
			} else if ((message.content.includes('G'))) {
				message.react('976178632458395728')
			};
		};
	} catch (error) {
		console.error(error);
		await logChannel.send(`<@295227446981033984> A message error occurred.\n\`\`\`\n${error}\`\`\``);
	};
});0

client.login(process.env.TOKEN);