const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');


async function movieRequestModal (interaction) {
    const form = new ModalBuilder()
        .setCustomId('movieModal')
        .setTitle('Movie Request Form');

    const movieInput = new TextInputBuilder()
        .setCustomId('movieRequest')
        .setLabel("Enter the movie title and trailer link")
        .setPlaceholder("Enter the movie title and trailer link")
        .setMinLength(1)
        .setMaxLength(200)
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

    const firstRow = new ActionRowBuilder().addComponents(movieInput);
    form.addComponents(firstRow);

    await interaction.showModal(form);
}

module.exports = {movieRequestModal};