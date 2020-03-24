/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
exports.run = (client, message, args, Discord, connection) => {
// Witty comment here
	const tags = [];
	const user = message.mentions.users.first() || message.author;

	if (args[1] === 'all') {
		connection.query(`SELECT * FROM \`tags\` WHERE \`guild\` = ${message.guild.id}`, (e, res) => {
			if (res.length > 0) {
				res.forEach((d) => {
					tags.push(d.name);
				});
			}

			const pages = Math.floor(tags.length / 10);

			if (tags.length === 0) {
				message.channel.send('This server doesn\'t own any tags.');
				return;
			}

			message.channel.send({
				embed: embed(client, tags, 0),
			}).then((msg) => {
				msg.react('⬅').then((e) => {
					e.message.react('➡');
				});
				let i = 0;
				const filter = (r, user) => user.id === message.author.id;
				const collector = msg.createReactionCollector(filter, {time: 60000 * 2});
				collector.on('collect', (r) => {
					r.remove(message.author.id);
					if (r.emoji.name === '⬅') {
						if (i === 0) {
							i = pages;
							msg.edit({embed: embed(client, tags, i)}).catch(console.error);
						} else {
							i--;
							msg.edit({embed: embed(client, tags, i)}).catch(console.error);
						}
					} else if (r.emoji.name === '➡') {
						if (i === pages) {
							i = 0;
							msg.edit({embed: embed(client, tags, i)}).catch(console.error);
						} else {
							i++;
							msg.edit({embed: embed(client, tags, i)}).catch(console.error);
						}
					}
				});
				collector.on('end', () => msg.reactions.removeAll().catch(console.error));
			});
		});
	} else {
		connection.query(`SELECT * FROM \`tags\` WHERE \`owner\` = ${user.id} AND \`guild\` = ${message.guild.id}`, (e, res) => {
			if (res.length > 0) {
				res.forEach((d) => {
					tags.push(d.name);
				});
			}
			if (tags.length > 0) {
				message.channel.send({embed: {
					title: `Tags for ${user.username} (total tags: ${tags.length})`,
					color: 9043849,
					description: tags.join(', '),
				}});
			} else {
				message.channel.send(`${user.username} does not own any tags.`);
			}
		});
	}
};


function embed(client, allC, pos) {
	const c = [];
	for (let i = 0; i < allC.length; i += 10) {
		c.push(allC.slice(i, i + 10));
	}
	const pages = c.length;
	const embed = {
		title: 'Official server',
		author: {
			name: `Page ${pos + 1}/${pages}`,
			url: null,
			icon_url: client.user.displayAvatarURL({ size: 2048, dynamic: true }),
			proxyicon_url: null,
		},
		color: 9043849,
		url: 'https://discord.gg/kwcd9dq',
		footer: {
			text: `PennyBot © Lilwiggy ${new Date().getFullYear()}`,
			icon_url: null,
			proxyicon_url: null,
		},
		fields: [],
	};
	c[pos].forEach((e, i) => {
		embed.fields.push({
			name: `${i + 1}.`,
			value: allC[allC.indexOf(e)],
		});
	});
	return embed;
}

exports.conf = {
	name: 'tags',
	description: 'View your own tags or someone else\'s tags.',
	usage: 'tags {optional: [@user/all]}',
	aliases: [],
};
