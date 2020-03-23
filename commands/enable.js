/* eslint-disable linebreak-style */
exports.run = (client, message, args, Discord, connection) => {
	// Enable this stuff cause it's awesome
	if (message.member.hasPermission('ADMINISTRATOR')) {
		if (args.length < 2) {
			message.channel.send(`Usage: ${client.prefix}enable [levels/mod logs/edits]`);
		} else if (args[1] === 'levels') {
			connection.query(`UPDATE \`Servers\` SET \`levels\` = 1 WHERE \`ServerID\` = '${message.guild.id}'`);
			message.channel.send('Successfully enabled levels.');
		} else if (args[1] === 'mod' && args[2] === 'logs') {
			connection.query(`UPDATE \`Servers\` SET \`mod_log\` = 1 WHERE \`ServerID\` = '${message.guild.id}'`);
			// Create a message collector
			message.channel.send('Please mention the chat for logs:').then((msg) => {
				const filter = (m) => m.author.id === message.author.id && m.mentions.channels.first();
				const collector = msg.channel.createMessageCollector(filter, {time: 15000});
				collector.on('collect', (m) => {
					connection.query(`UPDATE \`Servers\` SET \`mod_channel\` = '${connection.escape(m.mentions.channels.first().id)}' WHERE \`ServerID\` = '${m.guild.id}'`);
					m.channel.send(`Turned on mod logs and set ${m.mentions.channels.first()} as the mod channel.`);
					collector.stop();
				});
				collector.on('end', (collected) => {
					if (collected.size < 1) {
						message.channel.send(`You did not set a mod log channel. You can set one by doing ${client.prefix}set mod channel #channel`);
					}
				});
			});
		} else if (args[1] === 'edits') {
			connection.query(`UPDATE \`Servers\` SET \`edits\` = 1 WHERE \`ServerID\` = '${message.guild.id}'`);
			message.channel.send('Enabled role edits.');
		}
	} else {
		message.channel.send('This command is restricted to server admins.');
	}
};

exports.conf = {
	name: 'enable',
	description: 'Enables mod logs or levels or role edits.',
	usage: 'enable [levels/mod logs/edits]',
	aliases: [],
};
