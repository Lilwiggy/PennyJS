/* eslint-disable linebreak-style */
exports.run = (client, message, args, Discord, connection) => {
	// dolla dolla bills y'all
	const p = client.prefix;
	if (client.mirMap.get(message.guild.id) === 1) {
		message.channel.send('There is already a make it rain happening in this server.');
	} else {
		const cr = Math.floor(Math.random() * 1000);
		connection.query(`SELECT * FROM \`User\` WHERE \`User_ID\` = ${message.author.id}`, (err, res) => {
			if (err) {
				throw err;
			}
			if (res[0].Credits < cr) {
				message.channel.send('I\'m sorry but you do not have enough credits for this command.');
			} else {
				client.mirMap.set(message.guild.id, 1);
				connection.query(`UPDATE \`User\` SET \`Credits\` = \`Credits\` - ${connection.escape(cr)} WHERE \`User_ID\` = ${message.author.id}`);
				message.channel.send(`${message.author.username} has just thrown ${cr} credits in the air! The first person to pick them up by saying "${client.prefix}grab" wins them!`).then((msg) => {
					const filter = (m) => m.author.id !== message.author.id && m.content.toLowerCase() === `${p}grab`;
					msg.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']})
						.then((m) => {
							connection.query(`UPDATE \`User\` SET \`Credits\` = \`Credits\` + ${connection.escape(cr)} WHERE \`User_ID\` = ${m.first().author.id}`);
							message.channel.send(`Congrats ${m.first().author.username} you just won ${cr} credits!`).then(client.mirMap.set(message.guild.id, 0));
						})
						.catch((collected) => {
							if (collected.size === 0) {
								message.channel.send('It seems as if no one has picked up the credits. Oh well.').then((m) => client.mirMap.set(m.guild.id, 0));
								connection.query(`UPDATE \`User\` SET \`Credits\` = \`Credits\` + ${connection.escape(cr)} WHERE \`User_ID\` = ${message.author.id}`);
							}
						});
				});
			}
		});
	}
};

exports.conf = {
	name: 'mir',
	description: 'Makes it rain a random amount of credits. The first person to type grab wins them.',
	usage: 'mir',
	aliases: [],
};
