/* eslint-disable linebreak-style */
exports.run = (client, message, args, Discord, connection) => {
	// Tails or the heads of your enemies?
	const hts = ['heads', 'tails'];
	const ht = hts[Math.floor(Math.random() * hts.length)];
	if (args.length === 1) {
		message.channel.send(`Usage: ${client.prefix}ht heads or tails`);
	} else {
		connection.query(`SELECT Credits FROM User WHERE User_ID='${message.author.id}'`, (error, results) => {
			if (results[0].Credits === 0) {
				message.channel.send('You don\'t have enough credits for this.');
			} else {
				connection.query(`UPDATE \`User\` SET \`Credits\`=\`Credits\`-1 WHERE \`User_ID\` = '${message.author.id}'`);
				if (ht === 'heads') {
					if (args[1].toLowerCase() === 'heads' || args[1].toLowerCase() === 'h' || args[1].toLowerCase() === 'head') {
						connection.query(`UPDATE \`User\` SET \`Credits\`=\`Credits\`+2 WHERE \`User_ID\` = '${message.author.id}'`);
						message.channel.send(`It was ${ht}. Congrats you won one whole credit.`);
					} else {
						message.channel.send(`It was ${ht}. Well you lost. Try again maybe you will win.`);
					}
				} else if (ht === 'tails') {
					if (args[1].toLowerCase() === 'tails' || args[1].toLowerCase() === 't' || args[1].toLowerCase() === 'tail') {
						connection.query(`UPDATE \`User\` SET \`Credits\`=\`Credits\`+2 WHERE \`User_ID\` = '${message.author.id}'`);
						message.channel.send(`It was ${ht}. Congrats you won one whole credit.`);
					} else {
						message.channel.send(`It was ${ht}. Well you lost. Try again maybe you will win.`);
					}
				}
			}
		});
	}
};

exports.conf = {
	name: 'ht',
	description: 'Basic heads or tails. You win 1 credit if you win.',
	usage: 'ht [option]',
	aliases: [],
};
