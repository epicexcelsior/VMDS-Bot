module.exports = {
    clientId: "",
    guildId: "",
    suggestionThreadChannels: ["", ""], // Thread AND thumb reactions
    otherThreadChannels: [""],
    logChannelId: "",
    autoRoleChannelId: "", // Messages sent by bot will have role manager button added
    modId: "", // Can use !rolemanager command

    roleManagerButton: {
        label: 'Get Roles',
        style: 3,
        emoji: '⚙'
    },

    // button.customId MUST match the category name
    roleData: {
        roleCategoryName: {
            roles: {
                role1: {
                    label: 'Label',
                    value: 'ROLE ID',
                    description: 'Description',
                    emoji: '⭐'
                },
                role2: {
                    label: 'Label',
                    value: 'ROLE ID',
                    description: 'Description',
                    emoji: '👍'
                },
            },
            button: {
                customId: 'roleCategoryName',
                label: 'Label',
                style: 1,
                emoji: '🔔'
            },
            menu: {
                placeholder: 'Select Menu Placeholder',
                message: '> Select your roles below!',
            },
        },  
    },
}