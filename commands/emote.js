/* eslint-disable linebreak-style */
exports.run = (client, message, args, Discord, connection) => {
// Witty comment here
	if (args.length === 1) {
		message.channel.send(`Usage: ${client.prefix}emote [emote/all]`);
	} else {
		const em = /<a?:\w+:\d+>/g;
		if (em.test(args[1])) {
			const em_id = /[0-9]/g;
			const r = message.content.match(em_id).join('');
			if (r.length > 18) {
				if (message.guild.emojis.get(r.substr(0, 18))) {
					connection.query(`SELECT * FROM \`emote\` WHERE \`server_id\` = ${message.guild.id} AND \`emote_id\` = ${r.substr(0, 18)}`, (err, res) => {
						if (err) {
							throw err;
						}
						if (!res[0]) {
							message.channel.send('That emote has not been used.');
						} else {
							message.channel.send(`That emote has been used ${res[0].used} times.`);
						}
					});
				} else {
					message.channel.send('That emote is not on this server.');
				}
			} else if (message.guild.emojis.get(r)) {
				connection.query(`SELECT * FROM \`emote\` WHERE \`server_id\` = ${message.guild.id} AND \`emote_id\` = ${r}`, (err, res) => {
					if (err) {
						throw err;
					}
					if (!res[0]) {
						message.channel.send('That emote has not been used.');
					} else {
						message.channel.send(`That emote has been used ${res[0].used} times.`);
					}
				});
			} else {
				message.channel.send('That emote is not on this server.');
			}
		} else if (args[1].toLowerCase() === 'all') {
			if (message.guild.emojis.size === 0) {
				message.channel.send('This server has no emotes!');
			} else {
				connection.query(`SELECT * FROM \`emote\` WHERE \`server_id\` = ${message.guild.id}`, (err, res) => {
					if (err)
						console.error(err);
					if (res.length > 0) {
						let em = [];
						let k = 0;
						let pos = 1;
						res.sort((a, b) => b.used-a.used);
						res.forEach((emote, i) => {
							let e = message.guild.emojis.get(emote.emote_id);
							if (!e) {
								connection.query(`DELETE FROM \`emote\` WHERE \`emote_id\` = ${emote.emote_id}`);
								return;
							}
							e.used = res[i].used;
							if (i % 5 === 0) {
								k++;
								em[k] = new Array(5);
							}
							em[k].push(e);
						});
						message.channel.send({ embed: getEmbed(message, res, em, pos) }).then((msg) => {
							msg.react('⬅').then((e) => {
								e.message.react('➡');
							});
							let filter = (e, u) => (e.emoji.name === '⬅' || e.emoji.name === '➡') && u.id === message.author.id;
							let col = msg.createReactionCollector(filter, { time: 60000 * 5 });
							col.on('collect', (e) => {
								e.remove(message.author);
								if (e.emoji.name === '⬅') {
									if (pos === 1)
										pos = em.length;
									pos--;
								} else {
									if (pos === em.length - 1)
										pos = 0;
									pos++;
								}
  
								msg.edit({ embed: getEmbed(message, res, em, pos) });
							});
							col.on('end', () => msg.clearReactions().catch(console.error));
						});
					} else {
						message.channel.send('Error: res >= 0 emote.js (Please send this to my creator. Also hello btw)');
					}
				});
			}
		} else {
			message.channel.send(`Please use a custom emote. Or use ${client.prefix}emote all`);
		}
	}
};


function getEmbed(msg, res, emojis, pos) {
	let embed = {
		title: `Emoji stats for ${msg.guild.name}. Total logged: ${res.length}`,
		color: 9043849,
		fields: [],
		footer: {
			text: `Page ${pos}/${emojis.length - 1}`,
			icon_url: null,
			proxyicon_url: null,
		},
	};
	emojis[pos].forEach((e) => {
		embed.fields.push({
			name: `${e.name}: ${e}`,
			value: `Used: ${e.used}`
		});
	});
	return embed;
}


exports.conf = {
	name: 'emote',
	description: 'Stats for emotes.',
	usage: 'emote [emote/all]',
	aliases: [],
};
