exports.run = (client, guild, user, Discord, connection) => {
	// These are custom for 3 servers including my own. Please ignore it.
	client.checkServer(guild.id, guild.name, guild.iconURL(), () => {
		connection.query(`SELECT * FROM \`Servers\` WHERE \`ServerID\` = ${guild.id}`, (err, res) => {
			if (err)
				throw err;
			if (res[0].mod_log === 1) {
				let channel = guild.channels.cache.get(res[0].mod_channel);
				guild.fetchAuditLogs()
					.then((audit) => {
						let audits = audit.entries.first();
						if (audits.target.id === user.id) {
							let embed = {
								thumbnail: { url: user.displayAvatarURL() },
								color: 9043849,
								title: 'Ban removed.',
								fields: [
									{
										name: 'Ban removed.',
										value: `${audits.target.username} was un-banned by ${audits.executor.username}.`
									}
								]
							};
							if (channel)
								channel.send({ embed: embed });
						}
					});
			}
		});
	});
};
