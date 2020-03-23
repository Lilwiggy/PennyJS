/* eslint-disable linebreak-style */
exports.run = (client, message) => {
	const fetch = require('node-fetch');

	fetch('https://www.conversationstarters.com/random.php').then((r) => r.text()).then((r) => {
		message.channel.send(r.split('>')[1]);
	});
};


exports.conf = {
	name: 'topic',
	description: 'A topic starter.',
	usage: 'topic',
	aliases: [],
};
