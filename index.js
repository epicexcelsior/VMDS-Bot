const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Message, MessageFlags } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const { createThread } = require('./functions/threadCreator.js');
const dotenv = require('dotenv');
const { SlashCommandSubcommandGroupBuilder } = require('@discordjs/builders');
const { roleData } = require('./config.js');

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });


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
	if (interaction.isCommand()) {
		const command = client.commands.get(interaction.commandName);

		if (!command) return;
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: '<a:aWrong:978722165933359174> There was an error while executing this command.', ephemeral: true });
		}
	}

	if (interaction.isSelectMenu()) {
		if (interaction.customId !== 'role-menu') return;
		
		await interaction.deferReply({ ephemeral: true });

		// const roleId = interaction.values[0];
		// const role = interaction.guild.roles.cache.get(roleId);
		// const memberRoles = interaction.member.roles;
		// const hasRole = memberRoles.cache.has(roleId)
		const addList = [];
		const removeList = [];

		for (let item in valueOptions) {
			const roleId = valueOptions[item]
			const role = interaction.guild.roles.cache.get(roleId);
			const memberRoles = interaction.member.roles;
			const hasRole = memberRoles.cache.has(roleId)

			console.log(roleId)

			// console.log('role id:', roleId)
			// console.log(`has role ${role.name}?`, hasRole) // should be true
			// console.log('all options:', valueOptions)
			// console.log('all options includes role id?', valueOptions.includes(roleId)) // should be true
			// console.log('picked values:', interaction.values)
			// console.log('picked values includes role id?', interaction.values.includes(roleId)) // should be false

			if ((hasRole) && !(interaction.values.includes(roleId))) {
				memberRoles.remove(roleId)
				removeList.push(role.name)
			} else if (!(hasRole) && (interaction.values.includes(roleId))) {
				memberRoles.add(roleId)
				addList.push(role.name)
			}
		};
		await interaction.followUp(`Added roles: ${addList}\nRemoved roles: ${removeList}`)	
	};
});


client.on('messageCreate', async message => {
	createThread(message);
});

const valueOptions = []
for (let i in roleData.activities.roles) {
	valueOptions.push(roleData.activities.roles[i].value)
};

client.login(process.env.TOKEN);