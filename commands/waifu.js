/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
exports.run = (client, message) => {
	// This command is best girl. Just sayin'
	const images = require('../images.json');
	if (!client.guilds.cache.get(message.guild.id).waifuArr) {
		client.guilds.cache.get(message.guild.id).waifuArr = [];
	}
	message.channel.send('I approve.', {files: [randomImage(client.guilds.cache.get(message.guild.id).waifuArr, images.waifu)] });
};

function randomImage(arr, images) {
	const ran = images[Math.floor(Math.random() * images.length)];
	if (arr.length === images.length) {
		arr = [];
		return ran;
	} else {
		shuffle(arr);
		if (arr.includes(ran)) {
			randomImage(arr, images);
		} else {
			arr.push(ran);
			return ran;
		}
	}
}

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
// <3
function shuffle(a) {
	let j; let x; let i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

exports.conf = {
	name: 'waifu',
	description: 'Posts a random waifu.',
	usage: 'waifu',
	aliases: [],
};
