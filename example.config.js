module.exports = {
    clientId: "",
    guildId: "",
    suggestionThreadChannels: ["", ""],
    otherThreadChannels: [""],
    logChannelId: "",
    roleLogging: true,
    autoRoleChannelId: "",

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