const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId } = require('./config.json');
const dotenv = require('dotenv');
const fs = require('node:fs');

dotenv.config();

const commands = [];
const devCommands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const devCommandFiles = fs.readdirSync('./devCommands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
};

for (const file of devCommandFiles) {
	const devCommand = require(`./devCommands/${file}`);
	devCommands.push(devCommand.data.toJSON());
};

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log('Started refreshing application commands.');

		// Dev cmds
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: devCommands },
		);

		// Global cmds
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log('Successfully reloaded application commands.');
	} catch (error) {
		console.error(error);
	}
})();