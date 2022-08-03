const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Message, MessageFlags, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder, ButtonStyle, SlashCommandSubcommandGroupBuilder } = require('discord.js');
const { createThread } = require('./functions/threadCreator.js');
const { makeButtons } = require('./functions/roleButtons.js');
const { createRoleMenu } = require('./functions/roleMenus.js');
const dotenv = require('dotenv');
const { clientId, logChannelId, autoRoleChannelId } = require('./config.js');

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Retrieve commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
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

	if (interaction.isCommand()) {
		const command = client.commands.get(interaction.commandName);

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: '<a:aWrong:978722165933359174> There was an error while executing this command.\nPlease contact <@295227446981033984> with the error details.', ephemeral: true });
			await logChannel.send(`<@295227446981033984> An error occurred.\n\`\`\`\n${error}\`\`\``)
		};
	};


	if (interaction.isButton()) {
		makeButtons(interaction);

		if (interaction.customId === 'manage-roles') {
			client.commands.get('manage-roles').execute(interaction)
			 	.catch(() => console.error())
		};
	};

	if (interaction.isSelectMenu()) {
		createRoleMenu(interaction);
	};
});


client.on('messageCreate', async message => {
	createThread(message);

	if (message.content === 'test') {
		const sendChannel = await message.guild.channels.fetch('1004280176961658982'); //
		await sendChannel.send('Message');
		}

	if ((message.editable) && (message.channel.id === autoRoleChannelId) && (message.author.id === clientId)) {
		const roleButton = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('manage-roles')
					.setLabel('Manage Roles')
					.setEmoji('🗝')
					.setStyle(ButtonStyle.Success),
			);
		await message.edit({ components: [roleButton] })
	};
});

client.login(process.env.TOKEN);