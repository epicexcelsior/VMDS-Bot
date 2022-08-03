async function makeButtons (interaction) {
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
    });
}