const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('archive-threads')
		.setDescription('Archives all threads'),
	async execute(interaction) {
        try {
            const activeThreads = await interaction.guild.channels.fetchActiveThreads();
            const userMessage = await interaction.channel.send('Archiving threads...');
            for (const elem of activeThreads.threads.values()) {
                await elem.edit( {archived: true} )
                    .catch(console.error(error));
            };
            await userMessage.edit('✅ Successfully archived threads.')
        } catch (error) {
            await interaction.reply({content: '<a:aWrong:978722165933359174> An error occurred.', ephemeral: true});
            console.error(error);
        }
    }
};