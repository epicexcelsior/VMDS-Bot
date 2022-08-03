const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Message, MessageFlags, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder, ButtonStyle, SlashCommandSubcommandGroupBuilder } = require('discord.js');
const { createThread } = require('./functions/threadCreator.js');
const dotenv = require('dotenv');
const { roleData, logChannelId } = require('./config.js');

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
	const logChannel = await client.channels.fetch(logChannelId);

	if (interaction.isCommand()) {
		const command = client.commands.get(interaction.commandName);

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: '<a:aWrong:978722165933359174> There was an error while executing this command.\nPlease contact <@295227446981033984> with the error details.', ephemeral: true });
			await logChannel.send(`<@295227446981033984> Your code is bad, fix it.\n\`\`\`\n${error}\`\`\``)
		};
	};


	if (interaction.isButton()) {
		if (!(validButtonIds.includes(interaction.customId))) return;

		// Parses roleData to array to later use in select menu creation
		selectMenuOptions = [];
		const categoryRoles = roleData[interaction.customId].roles;
		for (let i in categoryRoles) {
			if (interaction.member.roles.cache.some(role => role.id === categoryRoles[i].value)) {
				categoryRoles[i].default = true
			} else {
				categoryRoles[i].default = false
			};
			selectMenuOptions.push(categoryRoles[i]);
		};
	
		const selectMenuRow = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId(interaction.customId + '-SelectMenu')
					.setPlaceholder(roleData[interaction.customId].menu.placeholder)
					.setMaxValues(selectMenuOptions.length)
					.setMinValues(0)
					.addOptions(
						selectMenuOptions
					),
			);
		
		const buttonRow = new ActionRowBuilder()
		for (let i in buttonData) {
			buttonRow.addComponents(
				new ButtonBuilder()
					.setCustomId(buttonData[i].customId)
					.setLabel(buttonData[i].label)
					.setEmoji(buttonData[i].emoji)
					.setStyle(ButtonStyle.Primary),
			);
		}
	
		await interaction.update({
			content: roleData[interaction.customId].menu.message,
			components: [selectMenuRow, buttonRow]
		})
	};

	if (interaction.isSelectMenu()) {
		if (!(validSelectMenuIds.includes(interaction.customId))) return;
		
		await interaction.deferUpdate();

		// Puts all possible choices of select menu (using same options that went into creating select menu) into an array
		// ASSUMES that the select menu has the exact same options that were added earlier using the category button
		try {
			const valueOptions = [];
			for (let i in selectMenuOptions) {
				valueOptions.push(selectMenuOptions[i].value)
			};

			let addList = [];
			let removeList = [];

			// Logic to add/remove roles
			// If they don't have the role and selected it, add the role; if they have the role and didn't select it, remove the role
			for (let item in valueOptions) {
				const roleId = valueOptions[item]
				const role = interaction.guild.roles.cache.get(roleId);
				const memberRoles = interaction.member.roles;
				const hasRole = memberRoles.cache.has(roleId)

				if ((hasRole) && !(interaction.values.includes(roleId))) {
					await memberRoles.remove(roleId)
						.then(() => {
							removeList.push(role.name)
							console.log('Removed', role.name, "role from", interaction.user.tag)
						})
						.catch((error) => {
							console.error(error)
							logChannel.send(`<@295227446981033984> Your code is bad, fix it.\n\`\`\`\n${error}\`\`\``)
						});
				} else if (!(hasRole) && (interaction.values.includes(roleId))) {
					await memberRoles.add(roleId)
						.then(() => {
							addList.push(role.name)
							console.log('Added', role.name, "role to", interaction.user.tag)
						})
						.catch((error) => {
							console.error(error);
							logChannel.send(`<@295227446981033984> Your code is bad, fix it.\n\`\`\`\n${error}\`\`\``);
						});
				};
			};
			if (addList.length === 0) { addList = ['none'] };
			if (removeList.length === 0) { removeList = ['none'] };
			console.log(addList, removeList)
			await logChannel.send(`**Updated roles for ${interaction.user.tag} (\`${interaction.user.id}\`) through role manager:**\n<:add:1004185816282701835> Added ${addList.join(', ')}\n<:remove:1004185817259978825> Removed ${removeList.join(', ')}`);
		} catch (error) {
			console.error(error);
			await logChannel.send(`<@295227446981033984> Your code is bad, fix it.\n\`\`\`\n${error}\`\`\``);
		}	
	};
});


client.on('messageCreate', async message => {
	createThread(message);
});

const buttonData = [];
const validButtonIds = [];
const validSelectMenuIds = [];
for (let i in roleData) {
	buttonData.push(roleData[i].button)
	validButtonIds.push(roleData[i].button.customId)
	validSelectMenuIds.push(roleData[i].button.customId + '-SelectMenu')
};

client.login(process.env.TOKEN);