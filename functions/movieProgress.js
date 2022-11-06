async function progress(client, message) {
    const now = Math.floor(Date.now() / 1000);

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

    message.reply(`The movie began <t:${client.movieStartTime}:R>\nThe movie ends <t:${client.movieEndTime}:R>\nThe movie is **${progress}%** complete as of <t:${now}:R>.`);
}

module.exports = {progress};