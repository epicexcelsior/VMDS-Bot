module.exports = {
    clientId: "",
    guildId: "",
    suggestionThreadChannels: ["", ""],
    otherThreadChannels: [""],
    logChannelId: "",
    autoRoleChannelId: "",

    roleManagerButton: {
        label: 'Manage Roles',
        style: 3,
        emoji: '⚙'
    },

    roleData: {
        vexentoNotifs: {
            roles: {
                youtubeNotifs: {
                    label: 'YouTube Notifications',
                    value: '906980734529572866',
                    description: 'Description 1',
                    emoji: '1️⃣'
                },
                twitterNotifs: {
                    label: 'Twitter Notifications',
                    value: '906980761079513119',
                    description: 'Description 1',
                    emoji: '1️⃣'
                },
            },
            button: {
                customId: 'vexentoNotifs',
                label: 'Vexento Notifications',
                style: 1,
                emoji: '🔔'
            },
            menu: {
                placeholder: 'notifs placeholder!!!',
                message: '> Wow test message goes here!',
            },
        },
        serverNotifs: {
            roles: {
                serverAnnouncements: {
                    label: 'Server Announcement Notifications',
                    value: '906980783481323581',
                    description: 'Description 1',
                    emoji: '1️⃣',
                },
                eventNotifs: {
                    label: 'Event Notifications',
                    value: '1003478799746347079',
                    description: 'Description 1',
                    emoji: '1️⃣',
                },
            },
            button: {
                customId: 'serverNotifs',
                label: 'Server Notifications',
                style: 1,
                emoji: '📣'
            },
            menu: {
                placeholder: 'Server notifs placeholder',
                message: '> Wow test message goes here!',
            },
        },  
        activities: {
            roles: {
                producer: {
                    label: 'Producer',
                    value: '906981440359657533',
                    description: 'vexento ayayay',
                    emoji: '🎹'
                },
                musician: {
                    label: 'Musician',
                    value: '1002413794829553674',
                    description: 'ladida',
                    emoji: '🎷'
                },
                singer: {
                    label: 'Singer/Vocalist',
                    value: '1002413841210155068',
                    description: 'Sing!!',
                    emoji: '🎙'
                },
                designer: {
                    label: 'Designer',
                    value: '1002414423417294899',
                    description: 'Design stuffs',
                    emoji: '🎨'
                },
                contentCreator: {
                    label: 'Content Creator',
                    value: '906981526829400105',
                    description: 'CCCCC',
                    emoji: '🎥'
                },
                gamer: {
                    label: 'Gamer',
                    value: '1002413938610282599',
                    description: 'Gameing',
                    emoji: '🎮'
                },
            },
            button: {
                customId: 'activities',
                label: 'Activities',
                style: 1,
                emoji: '🎈'
            },
            menu: {
                placeholder: 'Activites placeholder',
                message: '> Wow test message goes here!',
            },
        },  
    },
}