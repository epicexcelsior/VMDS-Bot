async function progress(client, message) {
    const now = Math.floor(Date.now() / 1000);
    let msg;

    // Checks if event has started/ended to determine if progress command can be used
    if (now > client.movieEndTime) {
        message.reply('<:SadCat:834556643152756767> There is no movie event happening right now.');
        return;
    } else if (now < client.movieStartTime) {
        message.reply(`<:PepePopcorn:834556626345787462> The movie event starts <t:${client.movieStartTime}:R>.`);
        return;
    };

    // To get 2 digits of accuracy, multiply by 100 before rounding then divide by 100 after rounding
    const progress = Math.round((now - client.movieStartTime) / (client.movieEndTime - client.movieStartTime) * 100 * 100) / 100;

    msg = `The movie began <t:${client.movieStartTime}:R>\nThe movie ends <t:${client.movieEndTime}:R>\nThe movie is **${progress}%** complete as of <t:${now}:t>.\n`;

    // Add emoji progress bar to message
    const total = 10; // total emojis
    const parts = 100 / total; // size of each percentage region
    const full = Math.floor(progress / parts); // # of full emojis
    const half = progress % parts; // Remainder of progress/emojis

    let count = 0;
    for (let i = 0; i < full; i++) {
        msg += '<:full:1054925583651459082>';
        count++;
    }
    if (half >= parts / 2) {
        msg += '<:half:1054925442710241390>';
        count++;
    }
    for (let i = 0; i < total-count; i++) {
        msg += '• • ';
    }

    message.reply(msg);
}

module.exports = {progress};