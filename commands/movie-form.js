const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const { movieRequest } = require('../config.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('movie-form')
        .setDescription('Announce movie night request form')
        .addIntegerOption(option =>
            option.setName('form_end_time')
                .setDescription('Deadline time (in Unix seconds) to submit movie requests')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('event_time')
                .setDescription('Movie event time in Unix seconds')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('event_link')
                .setDescription('Discord event URL')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('other_text')
                .setDescription('Text to precede announcement text; put \\n for newline (2 are already added)'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
	async execute(client, interaction) {
        try {
            console.log(`Movie form: ${interaction.user.tag} initiated movie form announcement command`);
            // Defines channels
            const eventChannel = await interaction.guild.channels.fetch(movieRequest.eventChannelId);

            let formButton = new ActionRowBuilder()
            formButton.addComponents(
                new ButtonBuilder()
                    .setCustomId('movieFormButton')
                    .setLabel('Request a movie')
                    .setEmoji('🍿')
                    .setStyle(ButtonStyle.Success),
            );

            let msg; // announcement message to be modified
            const otherText = interaction.options.getString('other_text');
            const eventLink = interaction.options.getString('event_link');  // discord event link
            const eventTime = interaction.options.getInteger('event_time');  // time of movie event
            client.unix = interaction.options.getInteger('form_end_time'); // movie request form deadline time

            client.formArr = []; // storage for movie request author ids

<<<<<<< Updated upstream
            const body = `Click the button below to submit a movie request for the next movie event!\nThe movie event will be hosted <t:${eventTime}:F> <t:${eventTime}:R>\nThe form will close <t:${client.unix}:R>.\n${eventLink}\n<@&${movieRequest.pingRole}>`;
=======
            const body = `Click the button below to submit a movie request for the next movie event. See the pinned messages for movies that have already been shown.\nThe movie event will be hosted **<t:${eventTime}:F> <t:${eventTime}:R>.**\nThis form will close <t:${client.unix}:R>.\n${eventLink}\n<@&${movieRequest.pingRole}>`;
            
            // If additional text has been added, append two newlines and then the message body
>>>>>>> Stashed changes
            otherText ? msg = otherText + '\n\n' + body : msg = body;

            await eventChannel.send({ content: msg, components: [formButton]});
            await interaction.reply({ content: 'The movie request form has been announced.', ephemeral: true});
            // to disable button from index.js later
            module.exports = { formButton };
            } catch {
                console.log('[MOVIE FORM] Failed to create/send movie form')
            }
    }
}