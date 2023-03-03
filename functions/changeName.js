async function changeName(client, channelId) {
	const channel = await client.channels.fetch(channelId);

    const animalEmojis = ['🐕', '🐈', '🐁', '🐹', '🐇', '🦊', '🐻', '🐵', '🐸', '🐖', '🐄', '🐅', '🐨', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🐺', '🦇', '🐗', '🐎', '🦄', '🐛', '🦋', '🐌', '🦗', '🕷️', '🐢', '🐍', '🦎', '🦕', '🦂', '🐙', '🦑', '🦀', '🐠', '🐟', '🦓', '🐆', '🐊', '🦈', '🐋', '🐬', '🦭', '🦍', '🦧', '🐘', '🦣', '🦬', '🦛', '🐪', '🦒', '🦘', '🐃', '🐂', '🐏', '🦙', '🐐', '🦌', '🐩',
    '🐈', '🦩', '🦢', '🦜', '🦚', '🦤', '🦃', '🐓', '🐿️', '🦔', '🦝', '🦨', '🦡', '🦫', '🦦', '🦥', '🐀', '🐉']
    console.log(animalEmojis.length)


    let num = 0;
	setInterval(() => {
	  channel.setName(`new-channel-${num}`)
		.then(updatedChannel => {
		  console.log(`Changed channel name to ${updatedChannel.name}`);
		})
		.catch(console.error);

        let emoji = Math.floor(Math.random() * animalEmojis.length);
        emoji = animalEmojis[emoji];

        num += 1;
	}, 1000);
}
module.exports = { changeName };