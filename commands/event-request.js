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
        .addStringOption(option =>
            option.setName('other_text')
                .setDescription('Enter text to precede announcement text; put \\n for newline (2 are already added)'))
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

        let msg; // announcement message to be modified
        const otherText = interaction.options.getString('other_text');
        const eventLink = interaction.options.getString('event_link');  // discord event link
        client.unix = interaction.options.getInteger('unix_time'); // form deadline time

        client.formArr = []; // storage for movie request author ids

        const body = `Click the button below to submit a movie request for the next movie night! The form will close <t:${client.unix}:R>.\n${eventLink}\n<@&${movieRequest.pingRole}>`;
        otherText ? msg = otherText + '\n\n' + body : msg = body;

        await eventChannel.send({ content: msg, components: [formButton]});
        await interaction.reply({ content: 'The movie request form has been announced.', ephemeral: true});
        // to disable button from index.js later
        module.exports = { formButton };
    }
}