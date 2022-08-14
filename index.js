const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Message, MessageFlags, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder, ButtonStyle, SlashCommandSubcommandGroupBuilder } = require('discord.js');
const { createThread } = require('./functions/threadCreator.js');
const { makeButtons } = require('./functions/roleButtons.js');
const { createRoleMenu } = require('./functions/roleMenus.js');
const dotenv = require('dotenv');
const { clientId, logChannelId, autoRoleChannelId, roleManagerButton, modId } = require('./config.js');

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

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
	try{
		const logChannel = await client.channels.fetch(logChannelId);

		if (interaction.isCommand()) {
			const command = client.commands.get(interaction.commandName);
			if (!(command) || !(validCommands.includes(command.data.name))) return;

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: '<a:aWrong:978722165933359174> There was an error while executing this command.\nPlease contact <@295227446981033984> with the error details.', ephemeral: true });
				await logChannel.send(`<@295227446981033984> A command error occurred.\n\`\`\`\n${error}\`\`\``)
			};
		};


		if (interaction.isButton()) {
			makeButtons(interaction);

			if (interaction.customId === 'manage-roles') {
				client.commands.get('manage-roles').execute(interaction)
					.catch((error) => console.error(error))
			};
		};

		if (interaction.isSelectMenu()) {
			createRoleMenu(interaction);
		};
	} catch (error) {
		console.error(error);
		await logChannel.send(`<@295227446981033984> An interaction error occurred.\n\`\`\`\n${error}\`\`\``)
	}
});


client.on('messageCreate', async message => {
	try{
		createThread(message);

		if ((message.content.toLowerCase() === '!rolemanager') && (message.member.roles.cache.has(modId))) {
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
		};
	} catch (error) {
		console.error(error);
		await logChannel.send(`<@295227446981033984> A message error occurred.\n\`\`\`\n${error}\`\`\``);
	};
});0

client.login(process.env.TOKEN);