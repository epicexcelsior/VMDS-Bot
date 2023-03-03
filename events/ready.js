const { changeName } = require('../functions/changeName');
const { animalChannelId } = require('../config.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}`);
        changeName(client, animalChannelId);
    }
}