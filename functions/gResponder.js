function gReactor(message, edited) {
    const matches = ['G', 'Ĝ', 'Ğ', 'Ģ', 'Ġ', 'Д', 'Г']
    if ((message.channel.id === '1030729098881945611' || message.channel.id === '779555811923591190')) {
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
                message.react('1️⃣');
                break;
            case 2:
                message.reactions.removeAll();
                message.react('2️⃣');
                break;
            case 3:
                message.reactions.removeAll();
                message.react('3️⃣');
                break;
            case 4:
                message.reactions.removeAll();
                const emojis = ['🤔','🍿','👍','🏆','🔸'];
                for (const emoji of emojis) {
                    message.react(emoji);
                }
                break;
        }
    }
}

module.exports = {gReactor}