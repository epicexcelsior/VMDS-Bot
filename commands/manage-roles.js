const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const { roleData } = require('../config.js')

const buttonData = []
for (let i in roleData) {
	buttonData.push(roleData[i].button)
};


module.exports = {
	data: new SlashCommandBuilder()
		.setName('manage-roles')
        .setDescription('Interactive role selection menu'),
	async execute(interaction) {
        const row = new ActionRowBuilder()
        for (let i in buttonData) {
            row.addComponents(
				new ButtonBuilder()
					.setCustomId(buttonData[i].customId)
					.setLabel(buttonData[i].label)
                    .setEmoji(buttonData[i].emoji)
					.setStyle(buttonData[i].style),
			);
        }
        await interaction.reply({ content: '**Choose a role category**', components: [row], ephemeral: true});
    }
}