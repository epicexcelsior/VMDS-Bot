const { suggestionThreadChannels, otherThreadChannels } = require('../config.json');

function createThread(message) {
    if (message.author.bot || message.content.includes('*** ***')) return

        if ((suggestionThreadChannels.includes(message.channel.id)) || (otherThreadChannels.includes(message.channel.id))) {
            try {
                // Truncates thread name if suggestion is longer than 100 chars
                let threadName = '';
                if (message.content) {
                    threadName = message.content;
                } else {
                    threadName = `Thread created by ${message.author.username}`;
                };
                
                if (threadName.length >= 100) {
                    threadName = threadName.slice(0, 97) + '...';
                };

                let chnl_type = ''
                let react = false

                if (suggestionThreadChannels.includes(message.channel.id)) {
                    chnl_type = 'suggestion';
                    react = true
                } else {
                    chnl_type = 'question';
                };

                // Creates thread (waits some time before creating in case original msg is deleted)
                setTimeout(async function(){ 
                    try {
                        const suggestionThread = await message.startThread({
                            name: `${threadName}`,
                            reason: `Suggestion/question posted by ${message.author.tag} in #${message.channel.name}`,
                            rateLimitPerUser: 5
                        });

                        // Reacts to user message
                        if (react) {
                            message.react('👍');
                            message.react('👎');
                            message.react('😁');
                        };
                        console.log(`Thread for ${message.author.tag} created in #${message.channel.name}`);
        
                    } catch (error) {
                        const response = await message.channel.send({ content: `<a:aWrong:978722165933359174> I was unable to create a thread for your ${chnl_type}.` });
                        console.log('Sent thread creation error message.');
                        console.error(error);
                        setTimeout(() => response.delete(), 7500);
                    };
                }, 500);

            } catch (error) {
                console.error(error);
            }
        }
    };

module.exports = {createThread}