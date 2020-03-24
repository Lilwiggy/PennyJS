/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
exports.run = (client, message, args, discord, connection) => {
	const bg = [];
	let i = 0;
		connection.query(`SELECT * FROM \`userB\` WHERE User_ID = '${message.author.id}'`, (e, res) => {
			if (res.length > 0) {
				res.forEach((d) => {
					if (d.name !== 'default') {
						bg.push(d.name);
					}
				});
				message.channel.send({embed: embed(bg[i])}).then((msg) => {
					msg.react('⬅').then((r) => {
						r.message.react('➡');
					});
					const filter = (r, user) => user.id === message.author.id;
					const collector = msg.createReactionCollector(filter, {time: 60000 * 2});
					collector.on('collect', (r) => {
						r.users.remove(message.author);
						if (r.emoji.name === '⬅') {
							if (i === 0) {
								i = bg.length - 1;
								msg.edit({embed: embed(bg[i])});
							} else {
								i--;
								msg.edit({embed: embed(bg[i])});
							}
						} else if (r.emoji.name === '➡') {
							if (i === bg.length - 1) {
								i = 0;
								msg.edit({embed: embed(bg[i])});
							} else {
								i++;
								msg.edit({embed: embed(bg[i])});
							}
						}
					});
					collector.on('end', () => msg.reactions.removeAll().catch(console.error));
				});
			} else {
				message.channel.send('You do not own any backgrounds.');
			}
		});
};

exports.conf = {
	name: 'backgrounds',
	description: 'View the background you have purchased.',
	usage: 'background',
	aliases: [],
};

function embed(bg) {
	return {
		title: bg,
		color: 9043849,
		image: {
			url: `https://penny.wiggy.dev/assets/backgrounds/${bg}.png`,
		},
	};
}
