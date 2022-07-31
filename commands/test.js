const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageMenu, MessageMenuOption, MessageSelectMenu } = require('discord.js');
const { roleData } = require('../config.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
        .setDescription('Testing multi-category role selection'),
	async execute(interaction) {
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Primary')
					//.setStyle(ButtonStyle.Primary),
			);
        await interaction.reply({ content: 'selection', components: [row]});
    }
}