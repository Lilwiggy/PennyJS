/* eslint-disable linebreak-style */
exports.run = (client, message, args, Discord, connection) => {
	if (args[1]) {
		if (args[1] === 'on') {
			connection.query(`UPDATE \`User\` SET \`weeb\` = 'on' WHERE \`User_ID\` = ${message.author.id}`);
			message.channel.send('You will now receive anime images from the hug command.');
		} else if (args[1] === 'off') {
			connection.query(`UPDATE \`User\` SET \`weeb\` = 'off' WHERE \`User_ID\` = ${message.author.id}`);
			message.channel.send('You will no longer receive anime images from the hug command.');
		} else {
			message.channel.send(`Usage: ${client.prefix}weeb [on/off]`);
		}
	} else {
		message.channel.send(`Usage: ${client.prefix}weeb [on/off]`);
	}
};


exports.conf = {
	name: 'weeb',
	description: 'Disables the anime gifs for the hug command.',
	usage: 'weeb [on/off]',
	aliases: [],
};
