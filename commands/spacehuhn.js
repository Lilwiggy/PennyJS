/* eslint-disable linebreak-style */
exports.run = (client, message) => {
	// Astro cocks
	const hi = Math.floor(Math.random() * 42);
	const embed = {
		title: 'Here\'s your official Spacehuhn meme:tm:',
		image: { url: `https://spacehuhn.io/img/gallery/${hi}.jpg` },
		color: 45311
	};

	message.channel.send({ embed: embed });
};

exports.conf = {
	name: 'spacehuhn',
	description: '<3',
	usage: 'spacehuhn',
	aliases: ['chicken', 'stef'],
	hidden: true,
};
