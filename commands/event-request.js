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
	async execute(interaction) {
        // Defines channels
        const eventChannel = await interaction.guild.channels.fetch(eventChannelId);
        const submissionLogChannel = await interaction.guild.channels.fetch(submissionLogChannelId);

        // Sends initial submission logging message in configured channel
        setSubmissionLogMessage(await submissionLogChannel.send("Movie night request submissions for X will be sent here:"));

        const formButton = new ActionRowBuilder()
        formButton.addComponents(
            new ButtonBuilder()
                .setCustomId('movieFormButton')
                .setLabel('Movie Request Form')
                .setEmoji('🍿')
                .setStyle(ButtonStyle.Primary),
        );

        await eventChannel.send({ content: 'Click the button', components: [formButton]});
        await interaction.reply({ content: 'Button sent', ephemeral: true});
    }
}