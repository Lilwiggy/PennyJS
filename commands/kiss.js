/* eslint-disable linebreak-style */
exports.run = (client, message) => {
	// Witty comment here
	const images = require('../images.json');
	const kisses = images.kiss;

	//                  Elferton
	const ppl = [ '407773762814083072'];
	if (!message.mentions.users.first()) {
		message.channel.send('Please mention a valid user.');
		return;
	}

	if (message.author.id === message.mentions.users.first().id) {
		message.channel.send('You cannot kiss yourself. Creep...');
		return;
	}

	if (message.mentions.users.first().id === '232614905533038593' && !ppl.includes(message.author.id)) {
		message.channel.send(`${message.author.username} just tried to kiss Lilwiggy. Yeah that didn't work.`, {files: ['https://media2.giphy.com/media/xT9IgAWzvvcohEMofu/source.gif']});
		return;
	}

	const kiss = kisses[Math.floor(Math.random() * kisses.length)];
	message.channel.send(`${message.author.username} just gave ${message.mentions.users.first().username} a kiss!`, {files: [kiss]});
};


exports.conf = {
	name: 'kiss',
	description: 'Kisses a user',
	usage: 'kiss [user]',
	aliases: [],
};

