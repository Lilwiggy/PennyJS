exports.run = (client, guild, user, Discord, connection) => {
	// These are custom for 3 servers including my own. Please ignore it.
	client.checkServer(guild.id, guild.name, guild.iconURL(), () => {
		connection.query(`SELECT * FROM \`Servers\` WHERE \`ServerID\` = '${guild.id}'`, (error, results) => {
			if (results[0].mod_log === 1) {
				setTimeout(() => {
					let channel = guild.channels.cache.get(results[0].mod_channel);
					guild.fetchAuditLogs()
						.then((audit) => {
							let audits = audit.entries.first();
							if (audits.target.id === user.id) {
								let embed = {
									thumbnail: { url: user.displayAvatarURL() },
									color: 16000036,
									title: 'New ban.',
									fields: [
										{
											name: 'New ban added.',
											value: `${audits.target.username} was banned by ${audits.executor.username}.`
										}
									]
								};
								if (audits.reason)
									embed.fields.push( { name: 'Reason:', value: audit.reason });
								else
									embed.fields.push( { name: 'Reason:', value: 'None provided.' });
								if (channel)
									channel.send({ embed });
							}
						});
				}, 1000);
			}
		});
	});
};
