module.exports = {
    clientId: "973446031645745222",
    guildId: "377336311834738689",
    modId: "880584596524265492",
    logChannelId: "1004466421109108786",

    // Thread creation
    suggestionThreadChannels: ["973000592005951518", "973000615229796402"], // Thread and thumb reactions
    otherThreadChannels: ["973000631449178124"],
    creationThreadChannels: ["1010786007467176027"],

    // Role manager
    roleLogging: false,
    autoRoleChannelId: "1004467208535150687", // Messages sent by bot will have role manager button added
    roleManagerButton: {
        label: 'Get Roles',
        content: '**Click the button below to manage your roles!**',
        style: 3,
        emoji: '✨'
    },

    movieRequest: {
        eventChannelId: '1007029641241956403',
        submissionLogChannelId: '1032926727036485672',
        pingRole: '829855953150935093',
    },

    // button.customId MUST match the category name
    roleData: {
        notifications: {
            roles: {
                ytNotifs: {
                    label: 'YouTube Notifications',
                    value: '1004467207809540153',
                    description: 'Get notified when Vexento uploads a video',
                    emoji: '1004649632305000528'
                },
                twitterNotifs: {
                    label: 'Twitter Notifications',
                    value: '1004467207809540152',
                    description: 'Get notified when Vexento tweets',
                    emoji: '1004649633705885766'
                },
                vexymcNotifs: {
                    label: 'VexyMC Notifications',
                    value: '1004467207809540149',
                    description: 'Get notified of Vexento Minecraft server announcements',
                    emoji: '💎'
                },
                eventNotifs: {
                    label: 'Event Notifications',
                    value: '1004467207809540151',
                    description: 'Get notified of server events',
                    emoji: '🎮'
                },
                serverNotifs: {
                    label: 'Server Notifications',
                    value: '1004467207809540150',
                    description: 'Get notified large server updates',
                    emoji: '📣'
                },
            },
            button: {
                customId: 'notifications',
                label: 'Notifications',
                style: 1,
                emoji: '🔔'
            },
            menu: {
                placeholder: 'Manage your notification preferences',
                message: '> Manage your notification preferences below',
            },
        },
        activities: {
            roles: {
                producer: {
                    label: 'Producer',
                    value: '1004467207851479151',
                    description: 'Access to #producer-chat channel',
                    emoji: '🎵'
                },
                musician: {
                    label: 'Musician',
                    value: '1004467207851479150',
                    description: 'Access to #producer-chat channel',
                    emoji: '🎹'
                },
                singer: {
                    label: 'Singer / Vocalist',
                    value: '1004467207826325583',
                    description: 'Access to #producer-chat channel',
                    emoji: '🎙'
                },
                designer: {
                    label: 'Designer',
                    value: '1004467207826325582',
                    description: 'Access to #design-chat channel',
                    emoji: '🎨'
                },
                contentCreator: {
                    label: 'Content Creator',
                    value: '1004467207826325581',
                    description: 'Access to #design-chat channel',
                    emoji: '🎥'
                },
                gamer: {
                    label: 'Gamer',
                    value: '1004467207826325580',
                    emoji: '🕹'
                },
            },
            button: {
                customId: 'activities',
                label: 'Activities',
                style: 1,
                emoji: '✨'
            },
            menu: {
                placeholder: 'Choose your activities',
                message: '> Choose your activities below',
            },
        },
        other: {
            roles: {
                introvert: {
                    label: 'Introvert',
                    value: '1004467207826325578',
                    emoji: '😐'
                },
                extrovert: {
                    label: 'Extrovert',
                    value: '1004467207826325577',
                    emoji: '😄'
                },
                ambivert: {
                    label: 'Ambivert',
                    value: '1004467207826325579',
                    emoji: '🙂'
                },
                snickers: {
                    label: 'Snickers™ Enjoyer',
                    value: '1004467207826325576',
                    description: 'For the lovers of nougat topped with caramel and peanuts that has been enrobed in milk chocolate.',
                    emoji: '1004650588102983760'
                },
                archive: {
                    label: 'View Archived Channels',
                    value: '1006768879105740893',
                    description: 'Be able to see the archived channels.',
                    emoji: '🔍'
                },
            },
            button: {
                customId: 'other',
                label: 'Other Roles',
                style: 1,
                emoji: '🎉'
            },
            menu: {
                placeholder: 'Choose your roles',
                message: '> Select other roles below',
            },
        },
    }
}
