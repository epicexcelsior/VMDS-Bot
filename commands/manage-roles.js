const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
//const { MessageActionRow, MessageMenu, MessageMenuOption, MessageSelectMenu } = require('discord.js');
const { roleData } = require('../config.js')
//const { valueOptions, buttonData, validButtonIds } = require('../index.js')

const valueOptions = []
for (let i in roleData.activities.roles) {
	valueOptions.push(roleData.activities.roles[i].value)
};

const buttonData = []
const validButtonIds = []
for (let i in roleData) {
	buttonData.push(roleData[i].button)
	validButtonIds.push(roleData[i].button.customId)
};


module.exports = {
	data: new SlashCommandBuilder()
		.setName('manage-roles')
        .setDescription('Testing multi-category role selection'),
	async execute(interaction) {
        const row = new ActionRowBuilder()
        for (let i in buttonData) {
            row.addComponents(
				new ButtonBuilder()
					.setCustomId(buttonData[i].customId)
					.setLabel(buttonData[i].label)
                    .setEmoji(buttonData[i].emoji)
					.setStyle(ButtonStyle.Primary),
			);
        }
        await interaction.reply({ content: '**Choose a role category**', components: [row], ephemeral: true});
    }
}