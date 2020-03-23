/* eslint-disable linebreak-style */
exports.run = (client, message) => {
// Get inspired dude mayn
	const http = require('http');
	const url = 'http://inspirobot.me/api?generate=true';
	http.get(url, (res) => {
		let body = '';

		res.on('data', (chunk) => {
			body += chunk;
		});

		res.on('end', () => {
			message.channel.send({files: [body]});
		});
	});
};

exports.conf = {
	name: 'inspire',
	description: 'Posts an "inspirational" image.',
	usage: 'inspire',
	aliases: [],
};
