exports.run = (client, member, Discord, connection) => {
	// Should I stay or should I g- oh they left already...
	let guild = member.guild;
	client.checkServer(guild.id, guild.name, guild.iconURL({ size: 2048, dynamic: true }), () => {
		connection.query(`SELECT * FROM \`Servers\` WHERE \`ServerID\` = '${guild.id}'`, (error, results) => {
			if (error)
				throw error;
			if (results[0].Welcome === 1) {
				let channel = member.guild.channels.cache.get(results[0].wc);
				if (channel) {
					if (results[0].LMessage)
						channel.send(`${results[0].LMessage.replace('{user}', member.user.username).replace('{guild}', guild.name)}`);
					else
						channel.send(`**${member.user.username}** just left **${guild.name}**`);
				}
			}
			if (results[0].mod_log === 1) {
				let channel = guild.channels.cache.get(results[0].mod_channel);
				guild.fetchAuditLogs()
					.then((audit) => {
						let audits = audit.entries.first();
						if (audits.target.id === member.id) {
							if (audits.action === 'MEMBER_KICK') {
								let embed = {
									thumbnail: { url: member.user.displayAvatarURL({ size: 2048, dynamic: true }) },
									color: 16343907,
									title: 'New kick.',
									fields: [
										{
											name: 'New kick added.',
											value: `${audits.target.username} was kicked by ${audits.executor.username}.`
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
						}
					});
			}
		});
	});
};
