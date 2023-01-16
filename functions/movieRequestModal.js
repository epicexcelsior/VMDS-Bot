const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');


async function movieRequestModal (interaction) {
    try {
        const form = new ModalBuilder()
            .setCustomId('movieModal')
            .setTitle('Movie Request Form');

        // First field - Movie title
        const titleInput = new TextInputBuilder()
            .setCustomId('movieTitle')
            .setLabel("Movie title")
            .setPlaceholder("Enter the movie's title")
            .setMinLength(1)
            .setMaxLength(200)
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        // Second field - Movie trailer
        const trailerInput = new TextInputBuilder()
            .setCustomId('movieTrailer')
            .setLabel("Movie trailer")
            .setPlaceholder("Enter the movie's trailer link (YouTube)")
            .setMinLength(1)
            .setMaxLength(200)
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        const firstRow = new ActionRowBuilder().addComponents(titleInput);
        const secondRow = new ActionRowBuilder().addComponents(trailerInput);
        form.addComponents(firstRow, secondRow);

        await interaction.showModal(form);
    } catch {
        console.log('[MOVIE EVENTS] Failed to create/display movie modal')
    }
}

module.exports = {movieRequestModal};