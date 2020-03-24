/* eslint-disable linebreak-style */
exports.run = (client, message, args, Discord, connection) => {
	// COOKIEESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
	const moment = require('moment');

	const gifs = [
		'http://i.imgur.com/59BsuwU.gif',
		'https://media.giphy.com/media/nAErqE3k2C3fy/giphy.gif',
		'https://i0.wp.com/media2.giphy.com/media/3YsEPo1u3C8dW/giphy.gif',
		'http://media.giphy.com/media/12D9NI9XRXXHEI/giphy.gif',
		'https://media1.tenor.com/images/51a659cee3d3d2b1d59014d967aafdc1/tenor.gif',
		'https://media1.tenor.com/images/079965b12ca69dedac627f6806a9a189/tenor.gif',
		'https://media1.tenor.com/images/99e562316f8e5b5fa996aee2cfb0d03b/tenor.gif',
	];
	const gif = gifs[Math.floor(Math.random() * gifs.length)];
	if (args.length === 1) {
		connection.query(`SELECT CT FROM \`User\` WHERE \`User_ID\`=${message.author.id}`, (error, results) => {
			if (results[0].CT === 0) {
				const dur = moment.duration(client.job.nextInvocation() - Date.now());
				message.channel.send(`You can give someone a cookie in, ${dur.hours()} hours, ${dur.minutes()} minutes, and ${dur.seconds()} seconds.`);
			} else {
				message.channel.send('**You can give someone a cookie.**');
			}
		});
	} else if (message.mentions.users.first()) {
		if (message.mentions.users.first().id === message.author.id) {
			message.channel.send('You can\'t give yourself a cookie!');
		} else
		if (message.mentions.users.first().bot) {
			message.channel.send('You can\'t give bots cookies!');
		} else {
				connection.query(`SELECT \`CT\` FROM \`User\` WHERE \`User_ID\`= ${message.author.id}`, (error, results) => {
					if (results[0].CT === 1) {
						connection.query(`UPDATE \`User\` SET \`CT\`= 0 WHERE \`User_ID\` = ${message.author.id}`);
						connection.query(`UPDATE \`User\` SET \`Cookie\`=\`Cookie\`+1 WHERE \`User_ID\` = ${message.mentions.users.first().id}`);
						message.channel.send(`${message.author.username} just gave ${message.mentions.users.first().username} a cookie!`, {
							files: [gif],
						});
					} else {
						const dur = moment.duration(client.job.nextInvocation() - Date.now());
						message.channel.send(`You can give someone a cookie in, ${dur.hours()} hours, ${dur.minutes()} minutes, and ${dur.seconds()} seconds.`);
					}
				});
		}
	} else {
		message.channel.send('Please mention a valid user.');
	}
};

// I'm starting to get really tired so my comments suck rn tbh

exports.conf = {
	name: 'cookie',
	description: 'Give someone a cookie. Please.',
	usage: 'cookie @user',
	aliases: [],
};
