const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rename-thread')
		.setDescription('Rename a suggestion/question thread that you created.')
		.addStringOption(option =>
			option.setName('new_name')
				.setDescription('The new name of the thread')
				.setRequired(true)),
	async execute(client, interaction) {
		console.log(`Rename threads: ${interaction.user.tag} initiated rename thread command`);
		try {
			if (!interaction.channel.isThread()) {
				await interaction.reply({ content:'<a:aWrong:978722165933359174> This command can only be used in thread channels.', ephemeral: true });
				return
			};

			const threadStartMsg = await interaction.channel.fetchStarterMessage();

			if (threadStartMsg.author.id === interaction.user.id) {
				const old_name = interaction.channel.name;
				let new_name = interaction.options.getString('new_name');

				if (new_name.length >= 100) {
					new_name = new_name.slice(0, 97) + '...';
				};

				await interaction.reply({content: `<a:aRight:978722165832695849> Thread renaming initiated. It may take a while depending on rate limiting.`, ephemeral: true})
					.then(console.log(`${interaction.user.tag} renamed thread "${old_name}" to "${new_name}"`))
					.catch(console.error());

				interaction.channel.send(`<@${interaction.user.id}> initiated thread renaming: \`${old_name}\` → \`${new_name}\``);
				await interaction.channel.edit({ name: new_name });

			} else {
				await interaction.reply({ content:'<a:aWrong:978722165933359174> You do not have permission to rename this thread.', ephemeral: true });
			};
		} catch (error) {
			console.error();
			await interaction.reply({ content:'<a:aWrong:978722165933359174> There was an error while executing this command.', ephemeral: true });
		}
	},
};