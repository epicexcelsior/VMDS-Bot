const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, GuildScheduledEventManager, GuildScheduledEvent, GuildScheduledEventPrivacyLevel, GuildScheduledEventEntityType, Guild } = require('discord.js');
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
            option.setName('other_text')
                .setDescription('Text to precede announcement text; put \\n for newline (2 are already added)'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
	async execute(client, interaction) {
        try {
            console.log(`Movie form: ${interaction.user.tag} initiated movie form announcement command`);

            // DEFINE VARIABLES
            // Defines channels
            const eventChannel = await interaction.guild.channels.fetch(movieRequest.eventChannelId);
            const movieChannel = await interaction.guild.channels.fetch(movieRequest.movieChannelId);

            let msg; // announcement message to be modified
            const otherText = interaction.options.getString('other_text');
            const eventTime = interaction.options.getInteger('event_time');  // time of movie event in unix
            client.unix = interaction.options.getInteger('form_end_time'); // movie request form deadline time
            client.formArr = []; // storage for movie request author ids

            // Create scheduled event
            const event = await interaction.guild.scheduledEvents.create({
                name: 'Movie Event',
                scheduledStartTime: new Date(eventTime*1000).toISOString(),
                privacyLevel: 2,
                entityType: 1,
                channel: movieChannel,
                description: `Vexento and Baba are hosting a movie event!\nSee <#${movieRequest.eventChannelId}> to request or vote for this week's movie.`
            })
            const eventLink = await event.url;  // discord event link

            // Create request button object
            let formButton = new ActionRowBuilder()
            formButton.addComponents(
                new ButtonBuilder()
                    .setCustomId('movieFormButton')
                    .setLabel('Request a movie')
                    .setEmoji('🍿')
                    .setStyle(ButtonStyle.Success),
            );

            // Announcement message body
            const body = `Click the button below to submit a movie request for the next movie event. See the pinned messages for movies that have already been shown.\nThe movie event will be hosted **<t:${eventTime}:F> <t:${eventTime}:R>.**\nThis form will close <t:${client.unix}:R>.\n${eventLink}\n<@&${movieRequest.pingRole}>`;
            
            // If additional text has been added, append two newlines and then the message body
            otherText ? msg = otherText + '\n\n' + body : msg = body;

            await eventChannel.send({ content: msg, components: [formButton]});
            await interaction.reply({ content: 'The movie request form has been announced.', ephemeral: true});

            // to disable button from index.js later
            module.exports = { formButton };
            } catch (error) {
                console.log('[MOVIE FORM] Failed to create/send movie form');
                console.error(error);
            }
    }
}