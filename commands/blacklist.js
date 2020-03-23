/* eslint-disable linebreak-style */
exports.run = (client, message, args, Discord, connection) => {
	// Ignore roles for the edit role command
	const roles = message.content.slice(client.prefix.length + args[0].length + 1).split('|');
	if (args.length === 1) {
		message.channel.send(`Usage: ${client.prefix}blacklist @role\n${client.prefix}blacklist Role 1 | Role 2 | Role 3`);
	} else if (message.member.permissions.has('ADMINISTRATOR')) {
		if (message.mentions.roles.first()) {
			message.mentions.roles.forEach((role) => {
				connection.query(`SELECT COUNT(*) AS \`count\`, \`role\`, \`guild\` FROM \`roles\` WHERE \`guild\` = '${message.guild.id}' AND \`role\` = ${role.id}`, (err, res) => {
					if (err) {
						throw err;
					}
					if (res[0].count === 0) {
						connection.query(`INSERT INTO \`roles\` (\`role\`, \`guild\`) VALUES ('${role.id}', '${message.guild.id}')`);
						message.channel.send(`Added ${role.name} to the blacklist.`);
					} else {
						connection.query(`DELETE FROM \`roles\` WHERE \`role\` = '${role.id}' AND \`guild\` = '${message.guild.id}'`);
						message.channel.send(`Removed ${role.name} from the blacklist.`);
					}
				});
			});
		} else {
			roles.forEach((role) => {
				message.guild.roles.cache.filter((guildRole) => {
					if (guildRole.name.toLowerCase() === role.toLowerCase().trim()) {
						connection.query(`SELECT COUNT(*) AS \`count\`, \`role\`, \`guild\` FROM \`roles\` WHERE \`guild\` = '${message.guild.id}' AND \`role\` = '${guildRole.id}'`, (err, res) => {
							if (err)
							{
								throw err;
							}
							if (res[0].count === 0) {
								connection.query(`INSERT INTO \`roles\` (\`role\`, \`guild\`) VALUES ('${guildRole.id}', '${message.guild.id}')`);
								message.channel.send(`Added ${role} to the blacklist.`);
							} else {
								connection.query(`DELETE FROM \`roles\` WHERE \`role\` = '${guildRole.id}' AND \`guild\` = '${message.guild.id}'`);
								message.channel.send(`Removed ${role} from the blacklist.`);
							}
						});
					}
				});
			});
		}
	} else {
		message.channel.send('This command is restricted to server admins.');
	}
};


exports.conf = {
	name: 'blacklist',
	description: 'Blacklist a role from the edit command. Use this same command to unblacklist a role.',
	usage: 'blacklist [role]',
	aliases: [],
};
