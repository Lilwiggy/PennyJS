exports.run = (client, reaction, user, dis, conn) => {
	// Shit star
	let guild = reaction.message.guild;
	let msg = reaction.message;
	const urlReg = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
	if (reaction.emoji.name !== '⭐')
		return;
	if (user.bot)
		return;


	client.checkServer(guild.id, guild.name, guild.iconURL({ size: 2048, dynamic: true }), () => {
		let embed = {
			title: msg.author.username,
			thumbnail: {
				url: msg.author.displayAvatarURL({ size: 2048 }),
			},
			color: 9043849,
		};
		if (msg.author.id === client.user.id && msg.embeds.length > 0) {
			if (msg.embeds[0].image) {
				embed.image = {
					url: msg.embeds[0].image.url,
				};
			}
			if (msg.embeds[0].description)
				embed.description = msg.embeds[0].description;
			if (msg.embeds[0].title)
				embed.title = msg.embeds[0].title;
			if (msg.embeds[0].thumbnail) {
				embed.thumbnail = {
					url: msg.embeds[0].thumbnail.url,
				};
			}
		} else {
			if (urlReg.test(msg.content)) {
				embed.description = msg.content;
				embed.image = {
					url: msg.content.match(urlReg)[0],
				};
			}
			if (msg.attachments.size > 0) {
				embed.image = {
					url: msg.attachments.first().url,
				};
			}
			if (msg.content.length > 0)
				embed.description = msg.content;
		}

		conn.query(`SELECT COUNT(*) AS \`count\`, \`msgID\`, \`starID\` FROM \`starboard\` WHERE \`starID\` = ${msg.id} OR \`msgID\` = ${msg.id}`, (err, c) => {
			if (err)
				console.log(err);

			conn.query(`SELECT COUNT(*) AS \`count\`, \`starboard\` FROM \`Servers\` WHERE \`ServerID\` = ${guild.id}`, (e, res) => {
				if (c[0].count === 0)
					return;

				try {
					client.starQueue.push(doStuff(client, guild, res, c, user, embed));
				} catch (error) {
					console.log('Oops');
					console.log(error);
				}
			});
		});
	});
};

function doStuff(client, guild, res, c, user, embed) {
	return async() => {
		let m = await guild.channels.get(res[0].starboard).messages.fetch(c[0].starID);
		let stars = m.content.split('stars');
		if (m.author.id === client.user.id) {
			guild.channels.get(m.mentions.channels.first().id)/messages.fetch(c[0].msgID).then((ms) => {
				ms.reactions.cache.some((r) => {
					if (r.users.has(user.id))
						return;
					embed.title = ms.author.username;
					embed.thumbnail = {
						url: ms.author.displayAvatarURL({ size: 2048, dynamic: true }),
					};
					embed.description = ms.content;
					if (parseInt(stars[0].slice(1)) < 2) {
						m.delete()
							.catch(() => { console.log('Error deleting 1'); });
					} else {
						m.edit(`⭐ ${parseInt(stars[0].slice(1)) - 1} stars in ${m.mentions.channels.first()}`, {
							embed: embed,
						})
							.catch(() => { console.log('Error editing 2'); });
					}
				});
			})
				.catch(() => {
					m.delete()
						.catch(() => { console.log('Error deleting 2'); });
				});
		} else {
			guild.channels.get(res[0].starboard).messages.fetch(c[0].starID).then((msSt) => {
				msSt.edit(`⭐ ${parseInt(stars[0].slice(1)) - 1} stars in ${msSt.mentions.channels.first()}`, {
					embed: embed,
				})
					.catch(() => { console.log('Error editing 1'); });
			});
		}
	};
}
