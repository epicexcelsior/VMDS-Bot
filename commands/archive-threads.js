const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('archive-threads')
		.setDescription('Archives all threads'),
	async execute(interaction) {
        try {
            const activeThreads = await interaction.guild.channels.fetchActiveThreads();
            await interaction.deferReply({ ephemeral: true })

            for (const elem of activeThreads.threads.values()) {
                await elem.edit( {archived: true} )
                    .then(console.log(`${interaction.user.tag} archived thread: ${elem.name}`))
                    .catch((error) => console.error(error))
            };
            
            await interaction.editReply('<a:aRight:978722165832695849> Successfully archived threads.');
        } catch (error) {
            await interaction.editReply({content: '<a:aWrong:978722165933359174> An error occurred.', ephemeral: true});
            console.error(error);
        }
    }
};