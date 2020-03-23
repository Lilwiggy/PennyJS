/* eslint-disable linebreak-style */
const https = require('https');
let body = '';
exports.run = (client, message) => {
// Witty comment here
	https.get(`https://api.giphy.com/v1/gifs/search?api_key=${client.config.giphy.key}&q=rabbit`, (res) => {
		res.on('data', (chunk) => {
			body += chunk;
		});
		res.on('end', () => {
			const data = JSON.parse(body);
			const i = Math.floor(Math.random() * data.data.length);
			message.channel.send({files: [data.data[i].images.original.url]});
			body = '';
		});
	});
};


exports.conf = {
	name: 'rabbit',
	description: 'Posts a random rabbit!',
	usage: 'rabbit',
	aliases: [],
};
