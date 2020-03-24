exports.run = (client, member, Discord, connection) => {
	// Oh hai Mark!
	let guild = member.guild;
	client.checkServer(guild.id, guild.name, guild.iconURL(), () => {
		connection.query(`SELECT * FROM \`Servers\` WHERE \`ServerID\` = '${guild.id}'`, (error, results) => {
			if (error)
				throw error;
			if (results[0].Welcome === 1) {
				const channel = member.guild.channels.cache.get(results[0].wc);
				if (channel) {
					if (results[0].WMessage)
						channel.send(`${results[0].WMessage.replace('{user}', member.user.username).replace('{guild}', guild.name)}`);
					else
						channel.send(`**${member.user.username}** just joined **${guild.name}**`);
				}
			}
		});
	});

	// This is special for now. Please ignore it. Please....

	// THE DOPE FREAKING PENNY SERVER LINK IS RIGHT THE HIZZLE HERE MY MAN/WOMAN! https://discord.gg/kwcd9dq
	if (guild.id === '309531752014151690') {
		let role = guild.roles.cache.find((r) => r.name === 'Normies');
		member.addRole(role);
	} else

	// Sky's server
	if (guild.id === '303525154464727041') {
		let role = guild.roles.cache.find((r) => r.name === 'Users');
		member.addRole(role);
	}
	// PivotsXXD server
	if (guild.id === '346800980102348810') {
		let role = guild.roles.cache.find((r) => r.name === 'Pivoteer');
		member.addRole(role);
	}
	// Diamond dogs
	if (guild.id === '399282953538109460') {
		let role = guild.roles.cache.get('407643543113433088');
		member.addRole(role);
	}
};
