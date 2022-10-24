const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const { movieRequest } = require('../config.js');
const { movieRequestModal } = require('../functions/movieRequestModal');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('movie-form')
        .setDescription('Announce movie night request form')
        .addIntegerOption(option =>
            option.setName('unix_time')
                .setDescription('Deadline time (in Unix seconds) to submit movie requests')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('event_link')
                .setDescription('Enter URL for Discord event')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
	async execute(client, interaction) {
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

        const eventLink = interaction.options.getString('event_link');

        client.unix = interaction.options.getInteger('unix_time');
        client.formArr = [];

        await eventChannel.send({ content: `Click the button below to submit a movie request for the next movie night! The form will close <t:${client.unix}:R>.\n${eventLink}\n<@&${movieRequest.pingRole}>`, components: [formButton]});
        await interaction.reply({ content: 'The movie request form has been announced.', ephemeral: true});
        // to disable button from index.js later
        module.exports = { formButton };
    }
}