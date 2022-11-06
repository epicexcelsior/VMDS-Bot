function gReactor(message, edited) {
    const matches = ['G', 'Ĝ', 'Ğ', 'Ģ', 'Ġ', 'Д', 'Г']
    if ((message.channel.id === '778325316015882322' || message.channel.id === '779555811923591190')) {
        let hasG = false;
        let scenario = 0;
        for (const i of matches) {
            if (message.content === i) {
                scenario = 1;
                hasG = true;
                break;
            } else if (message.content.includes(i)) {
                scenario = 2;
                hasG = true;
                break;
            }
        }
        if (message.content === 'g') {
            scenario = 3;
        }

        if (edited && hasG) {
            scenario = 4;
        } else if (edited && !hasG) {
            message.reactions.removeAll();
        }

        switch (scenario) {
            case 1:
                message.reactions.removeAll();
                message.react('<:DrakeNo:834579267308224512>');
                break;
            case 2:
                message.reactions.removeAll();
                message.react('<:Facepalm:837206302174085170>');
                break;
            case 3:
                message.reactions.removeAll();
                message.react('<:FBhug2:910346042040520795>');
                break;
            case 4:
                message.reactions.removeAll();
                const emojis = ['<:BANPAN:1026203906402955305>', '<:HandRight:906778589838581760>', '<a:HaHaHa:977058466113933352>', '<:HandLeft:906778589222023219>'];
                for (const emoji of emojis) {
                    message.react(emoji);
                }
                break;
        }
    }
}

module.exports = {gReactor}