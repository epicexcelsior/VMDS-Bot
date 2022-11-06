const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-movie-times')
        .setDescription('Set movie start/end times for !progress command')
        .addIntegerOption(option =>
            option.setName('start_unix')
                .setDescription('Start time of movie in Unix seconds')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('end_unix')
                .setDescription('end time of movie in Unix seconds')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageEvents),
	async execute(client, interaction) {        
        client.movieStartTime = interaction.options.getInteger('start_unix');
        console.log(`Movie progress: start time set to ${client.movieStartTime}`);
        client.movieEndTime = interaction.options.getInteger('end_unix');
        console.log(`Movie progress: end time set to ${client.movieEndTime}`);

        // Checks if start time is less than end time
        if (!(client.movieStartTime < client.movieEndTime)) {
            await interaction.reply({ content: '🤔 Time doesn\'t go backwards (yet). Please try again.', ephemeral: true });
            console.log('Movie progress: error message sent; End time less than start time.')
            return;
        }

        await interaction.reply({ content: '🍿 Movie times have been set successfully. Enjoy!', ephemeral: true })
    }
}