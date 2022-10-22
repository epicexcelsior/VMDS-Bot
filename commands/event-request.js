const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { eventChannelId, submissionLogChannel, submissionLogChannelId } = require('../config.js');
let { setSubmissionLogMessage } = require('../index.js');
const { movieRequestModal } = require('../functions/movieRequestModal');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mn-request')
        .setDescription('Announce movie night request form in #events')
        .addIntegerOption(option =>
            option.setName('unix')
                .setDescription('Deadline time (in Unix) to submit movie requests')
                .setRequired(true)),
	async execute(client, interaction) {
        // Defines channels
        const eventChannel = await interaction.guild.channels.fetch(eventChannelId);

        const formButton = new ActionRowBuilder()
        formButton.addComponents(
            new ButtonBuilder()
                .setCustomId('movieFormButton')
                .setLabel('Movie Request Form')
                .setEmoji('🍿')
                .setStyle(ButtonStyle.Primary),
        );

        client.unix = interaction.options.getInteger('unix');

        await eventChannel.send({ content: 'Click the button', components: [formButton]});
        await interaction.reply({ content: 'Button sent', ephemeral: true});
    }
}