/* eslint-disable linebreak-style */
exports.run = (client, message, args, Discord, connection) => {
// Background thingies! (needs more)
	const data = require('../modules/shop.json');
	if (args.length === 1) {
		message.channel.send(`Usage: ${client.prefix}setbackground [background]\nBackground options are here: https://penny.wiggy.dev/backgrounds or by doing ${client.prefix}shopinfo backgrounds`);
	} else if (args[1] === 'default') {
		client.setBackground(message.author.id, message.author.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }), 'default', 0, message);
	} else if (data[args[1]] && data[args[1]].type === 'background') {
		if (args[1] === 'patreon') {
			connection.query(`SELECT * FROM \`User\` WHERE \`User_ID\` = ${message.author.id}`, (err, res) => {
				if (err) {
					throw err;
				}
				if (res[0].patron === 1) {
					client.setBackground(message.author.id, message.author.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }), 'patreon', 0, message);
				} else {
					message.channel.send('This background is for Patreons only.');
				}
			});
		} else {
			client.setBackground(message.author.id, message.author.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }), data[args[1]].name, data[args[1]].price, message);
		}
	} else {
		message.channel.send('Background options can be found here: https://penny.wiggy.dev/backgrounds or by doing //shopinfo backgrounds');
	}
};

exports.conf = {
	name: 'setbackground',
	description: 'Purchase or equip a background on Penny for your profile.',
	usage: 'setbackground [background]',
	aliases: [],
};
