/* eslint-disable linebreak-style */
exports.run = (client, message, args, Discord, connection) => {
// You want me turned on or off?
	if (message.member.hasPermission('ADMINISTRATOR')) {
		if (args.length === 1) {
			message.channel.send('Usage: //welcome on\nOr: //welcome off');
		} else {
			client.checkServer(message.guild.id, message.guild.name, message.guild.iconURL(), () => {
				if (args[1].toLowerCase() === 'on') {
					connection.query(`UPDATE \`Servers\` SET \`Welcome\` = 1 WHERE \`ServerID\` = '${message.guild.id}'`);
					message.channel.send('Successfully turned on welcome messages.');
				} else
				if (args[1].toLowerCase() === 'off') {
					connection.query(`UPDATE \`Servers\` SET \`Welcome\` = 0 WHERE \`ServerID\` = '${message.guild.id}'`);
					message.channel.send('Successfully turned off welcome messages.');
				} else {
					message.channel.send('Usage: //welcome on\nOr: //welcome off');
				}
			});
		}
	} else {
		message.channel.send('This command is restricted to server admins.');
	}
};

exports.conf = {
	name: 'welcome',
	description: 'Enables/disables welcome messages.',
	usage: 'welcome [on/off]',
	aliases: [],
};
