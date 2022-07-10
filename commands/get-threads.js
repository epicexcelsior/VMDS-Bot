const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fetch-threads')
		.setDescription('Thread testing'),
	async execute(interaction) {
        const activeThreads = await interaction.guild.channels.fetchActiveThreads();
        //console.log(activeThreads)
        //console.log(activeThreads.threads.values())
        for (const elem of activeThreads.threads.values()) {
            await elem.delete()
        };
        await interaction.reply('All threads have been deleted.')
    }
};