/* eslint-disable linebreak-style */
exports.run = (client, message, args, Discord, connection) => {
	//* peaks over shoulder at atm*
  
	let user = client.fetchGuildMember(message) || message.author;

	if (user.bot) {
		message.channel.send('Bots don\'t have money silly!');
		return;
	}
	if (user) {
		connection.query(`SELECT Credits FROM User WHERE User_ID='${user.id}'`, (error, results) => {
			if (user.id === message.author.id) 
				message.channel.send(`💰 You have ${results[0].Credits} credits. 💰`);
			else 
				message.channel.send(`💰 ${user.user.username} has ${results[0].Credits} credits. 💰`);
		});
	} else {
		message.channel.send('I could not find that user.');
	}
};

exports.conf = {
	name: 'credits',
	description: 'View your credits or someone else\'s credits.',
	usage: 'credits {optional: [@user]}',
	aliases: [],
};
