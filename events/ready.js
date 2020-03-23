exports.run = (client, Discord, connection) => {
	// This is when the client is ready and connects to discord. It's very very boring. Please move on to the next file.
	// For setting cookie and daily times
	const s = require('node-schedule');

	client.job = s.scheduleJob({ hour: 0, minute: 0 }, () => {
		connection.query('UPDATE `User` SET `CT` = 1');
		connection.query('UPDATE `User` SET `DailyTime` = 1');
	});

	console.log('I\'m combat ready!');
	client.user.setActivity('penny.wiggy.dev', { type: 0 });
};
