const { roleData } = require('../config.js');
const { ActionRowBuilder, ButtonBuilder, SelectMenuBuilder } = require('discord.js');
const buttonData = [];
const validButtonIds = [];
for (let i in roleData) {
	buttonData.push(roleData[i].button)
	validButtonIds.push(roleData[i].button.customId)
};

async function makeButtons (interaction) {
    if (!(validButtonIds.includes(interaction.customId))) return;

    // Parses roleData to array to use in select menu creation
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
    // // Parses roleData to array to use in button creation
    // const buttonComponents = [];
    // for (let i in roleData[interaction.customId].button) {
        // buttonComponents.push(roleData[interaction.customId].button[i]);
    // };
    
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
                .setStyle(buttonData[i].style),
        );
    }

    await interaction.update({
        content: roleData[interaction.customId].menu.message,
        components: [selectMenuRow, buttonRow]
    });
    interaction.reply({content: '<a:aRight:978722165832695849> Your roles have been updated!', ephemeral: true});
};

module.exports = {makeButtons}