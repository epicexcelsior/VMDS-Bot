const { suggestionThreadChannels, otherThreadChannels, creationThreadChannels } = require('../config.js');

function createThread(message) {
    if (message.author.bot || message.content.includes('*** ***')) return

    if (!((suggestionThreadChannels.includes(message.channel.id)) || (otherThreadChannels.includes(message.channel.id)) || (creationThreadChannels.includes(message.channel.id)))) return;
    
    try {        
        let threadName = `Thread created by ${message.author.username}`;
        let react = false;
        if (message.content) {
            if ((suggestionThreadChannels.includes(message.channel.id) || otherThreadChannels.includes(message.channel.id))) {
                threadName = message.content;
                react = true;
            } else if (creationThreadChannels.includes(message.channel.id)) {
                threadName = `Feedback for ${message.author.username}'s creation`;
            };
        };

        // Truncates thread name if suggestion is longer than 100 chars                
        if (threadName.length >= 100) {
            threadName = threadName.slice(0, 97) + '...';
        };

        // Creates thread (waits some time before creating in case original msg is deleted)
        setTimeout(async function(){ 
            try {
                const suggestionThread = await message.startThread({
                    name: threadName,
                    reason: `Auto thread for message posted by ${message.author.tag} in #${message.channel.name}`,
                    rateLimitPerUser: 5
                });

                // Reacts to user message
                if (react) {
                    message.react('👍');
                    message.react('👎');
                };
                console.log(`Thread for ${message.author.tag} created in #${message.channel.name}`);

            } catch (error) {
                const response = await message.channel.send({ content: '<a:aWrong:978722165933359174> I was unable to create a thread for your message.' });
                console.log('Sent thread creation error message.');
                console.error(error);
                setTimeout(() => response.delete(), 10000);
            };
        }, 500);

    } catch (error) {
        console.error(error);
    };
};

module.exports = {createThread}