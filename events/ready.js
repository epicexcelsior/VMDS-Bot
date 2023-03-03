const { changeName } = require('../functions/changeName')

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}`);
        changeName(client, '941175740999798814');
    }
}