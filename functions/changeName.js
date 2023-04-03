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
	async function changeEmoji() {
		let emoji = Math.floor(Math.random() * animalEmojis.length);
		emoji = animalEmojis[emoji];
		await channel.edit({name: `${emoji}animals`})
			.then(updatedChannel => {
				console.log(`Changed animal channel name to ${updatedChannel.name}`);
			})
			.catch(console.error);

        num += 1;
	}

	changeEmoji();
	setInterval(async () => {
		changeEmoji();
	}, 432000000);
}
module.exports = { changeName };