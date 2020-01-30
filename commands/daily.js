/* eslint-disable linebreak-style */
exports.run = (client, message, args, Discord, connection) => {
	// Nightly. 😤
	const moment = require('moment');
	let user = message.mentions.users.first() || message.author;
	if (user.bot) {
		message.channel.send('Bots have no use for money.');
		return;
	}
	client.checkUser(user.id, user.displayAvatarURL, () => {
		connection.query(`SELECT \`DailyTime\`, \`patron\`  FROM \`User\` WHERE \`User_ID\`='${message.author.id}'`, (error, results) => {
			let amount = Math.floor(Math.random() * (1000 - 500)) + 500;
			if (results[0].patron === 1)
				amount += 500;
			if (results[0].DailyTime === 1) {
				if (user.id === message.author.id) {
					connection.query(`UPDATE \`User\` SET \`DailyTime\` = 0,\`Credits\`=\`Credits\` + ${amount} WHERE \`User_ID\` = '${user.id}'`);
					message.channel.send(`💸 Here's your ${amount} credits 💸`);
				} else {
					amount = Math.floor(Math.random() * (2000 - 1000)) + 1000;
					connection.query(`UPDATE \`User\` SET \`Credits\`=\`Credits\` + ${amount} WHERE \`User_ID\` = '${user.id}'`);
					connection.query(`UPDATE \`User\` SET \`DailyTime\` = 0 WHERE \`User_ID\` = '${message.author.id}'`);
					message.channel.send(`💸 ${message.author.username} just gave ${user.username} ${amount} daily credits! 💸`);
				}
			} else {
				const dur = moment.duration(client.job.nextInvocation() - Date.now());
				message.channel.send(`Your daily will reset in, ${dur.hours()} hours, ${dur.minutes()} minutes, and ${dur.seconds()} seconds.`);
			}
		});
	});
};

exports.conf = {
	name: 'daily',
	description: 'Get your daily credits. Or give them to someone else.',
	usage: 'daily {optional: [@user]}',
	aliases: ['dailies'],
};