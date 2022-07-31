const { SlashCommandBuilder, ButtonBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageMenu, MessageMenuOption, MessageSelectMenu } = require('discord.js');
const { roleData } = require('../config.js')

// module.exports = {
//     name: 'select',
//     run: async(client, message, args) => {
//         const row = new MessageActionRow()
//             .addComponents(
//                 new MessageSelectMenu()
//                     .setCustomId('test-subject')
//                     .setPlaceholder('Choose something')
//                     .addOptions([
//                         {
//                             label: 'Label goes here',
//                             value: 'Value goes here',
//                             description: 'Desc',
//                             emoji: '😄'
//                         }
//                     ])
//             )
//     }
// }

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
        .setDescription('Manage your roles in the server'),
	async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('role-menu')
                    .setPlaceholder('Choose something')
                    .setMaxValues(5)
                    .setMinValues(0)
                    .addOptions([
                        roleData.activities.roles.producer,
                        roleData.activities.roles.musician,
                        roleData.activities.roles.singer,
                        roleData.activities.roles.designer,
                        roleData.activities.roles.contentCreator,
                        roleData.activities.roles.gamer
                    ]),
            )
        await interaction.reply({ content: 'selection', components: [row] , ephemeral: true});
    }
}