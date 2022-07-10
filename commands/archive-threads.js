const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('archive-threads')
		.setDescription('Archives all threads'),
	async execute(interaction) {
        const activeThreads = await interaction.guild.channels.fetchActiveThreads();
        for (const elem of activeThreads.threads.values()) {
            await elem.edit( {archived: true} )
        };
        await interaction.channel.send(`<@${interaction.user.id}> All threads have been deleted!`);
    }
};