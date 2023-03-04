// Changes the #animals channel emoji to a different animal on a daily basis

async function changeName(client, channelId) {
	const channel = await client.channels.fetch(channelId);

    const animalEmojis = ['🐕', '🐈', '🐁', '🐹', '🐇', '🦊', '🐻', '🐵',
	'🐸', '🐖', '🐄', '🐅', '🐨', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅',
	'🦉', '🐺', '🦇', '🐗', '🐎', '🦄', '🐛', '🦋', '🐌', '🦗', '🕷️',
	'🐢', '🐍', '🦎', '🦕', '🦂', '🐙', '🦑', '🦀', '🐠', '🐟', '🦓',
	'🐆', '🐊', '🦈', '🐋', '🐬', '🦭', '🦍', '🦧', '🐘', '🦣', '🦬',
	'🦛', '🐪', '🦒', '🦘', '🐃', '🐂', '🐏', '🦙', '🐐', '🦌', '🐩',
    '🐈', '🦩', '🦢', '🦜', '🦚', '🦤', '🦃', '🐓', '🐿️', '🦔', '🦝',
	'🦨', '🦡', '🦫', '🦦', '🦥', '🐀', '🐉']

    let num = 0;
	setInterval(async () => {
		let emoji = Math.floor(Math.random() * animalEmojis.length);
		emoji = animalEmojis[emoji];
		await channel.edit({name: `${emoji}animals`})
			.then(updatedChannel => {
				console.log(`Changed animal channel name to ${updatedChannel.name}`);
			})
			.catch(console.error);

        num += 1;
	}, 86400000);
}
module.exports = { changeName };