const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fix-times')
        .setDescription('Fix the movie form end time')
        .addIntegerOption(option =>
            option.setName('end_unix')
                .setDescription('end time of movie in Unix seconds')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageEvents),
	async execute(client, interaction) {        
        const endTime = interaction.options.getInteger('end_unix');
        client.unix = endTime;
        await interaction.reply({ content: `Movie form end time set to <t:${client.unix}:F>`, ephemeral: true })
    }
}