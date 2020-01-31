module.exports = (client, connection, Raven) => {
	// Super secret spy stuff that I took "inspiration"
	// from An Idiot's guide for. It just loads commands and stuff, I made it a little different. DON'T SHAME ME!

	client.error = (e) => {
		Raven.captureException(e);
	};
	client.loadCommand = (commandName) => {
		try {
			const props = require(`../commands/${commandName}`);
			if (props.init)
				props.init(client);

			client.commands.set(props.conf.name, props);
			props.conf.aliases.forEach((alias) => {
				client.aliases.set(alias, props.conf.name);
			});
			return false;
		} catch (e) {
			return `Unable to load command ${commandName}: ${e}`;
		}
	};

	// Admin commands
	client.loadAdminCommand = (commandName) => {
		try {
			const props = require(`../commands/admin/${commandName}`);
			if (props.init)
				props.init(client);

			client.adminCommands.set(props.conf.name, props);
			return false;
		} catch (e) {
			return `Unable to load command ${commandName}: ${e}`;
		}
	};

	// Check to see if the user is in the database.
	client.checkUser = (userID, UserAvatar, callback) => {
		try {
			connection.query(`SELECT COUNT(*) AS \`count\`, \`UserAvatar\` FROM \`User\` WHERE \`User_ID\`='${userID}'`, (error, results) => {
				if (results[0].count === 0) {
					connection.query(`INSERT INTO \`User\`(\`User_ID\`, \`UserAvatar\`, \`Used\`) VALUES ('${userID}', '${UserAvatar}', 0)`, (err) => {
						if (err)
							throw err;
						callback();
					});
				} else {
					if (results[0].UserAvatar !== UserAvatar)
						connection.query(`UPDATE \`User\` SET \`UserAvatar\` = '${UserAvatar}' WHERE \`User_ID\`='${userID}'`, () => {});
					callback();
				}
			});
		} catch (e) {
			client.error(e);
		}
	};


	// But is the guild in the db?
	client.checkServer = (serverID, serverName, serverIcon, callback) => {
		try {
			connection.query(`SELECT COUNT(*) AS \`count\`, \`ServerIcon\` FROM \`Servers\` WHERE \`ServerID\` = '${serverID}'`, (error, results) => {
				if (error)
					console.log(error);
				if (results[0].count === 0) {
					console.log(serverID);
					connection.query(`INSERT INTO \`Servers\` (\`ServerID\`) VALUES ('${serverID}')`, (error) => {
						if (error)
							console.log(error);
						callback();
					});
				} else {
					if (results[0].ServerIcon !== serverIcon)
						connection.query(`UPDATE \`Servers\` SET \`ServerIcon\` = '${serverIcon}' WHERE \`ServerID\` = '${serverID}'`);
					callback();
				}
			});
		} catch (e) {
			console.log(e);
			client.error(e);
		}
	};


	// Trust me you're gonna wanna add this.

	client.setBackground = (id, avatar, background, amount, msg) => {
		try {
			client.checkUser(id, avatar, () => {
				connection.query(`SELECT COUNT(*) AS hasB FROM \`userB\` WHERE \`User_ID\` = ${id} AND \`name\` = '${background}'`, (err1, res1) => {
					if (res1[0].hasB === 0) {
						connection.query(`SELECT *  FROM \`User\` WHERE \`User_ID\` = ${id}`, (err, res) => {
							if (err)
								throw err;
							if (res[0].Credits < amount) {
								msg.channel.send('I\'m sorry you don\'t have enough money for this background.');
							} else {
								connection.query(`UPDATE \`User\` SET \`background\` = '${background}', \`Credits\`=\`Credits\` -${amount} WHERE \`User_ID\` = ${id}`);
								connection.query(`INSERT INTO \`userB\` (\`User_ID\`, \`name\`) VALUES (${id}, '${background}')`);
								msg.channel.send('Successfully bought your background.');
							}
						});
					} else {
						connection.query(`UPDATE \`User\` SET \`background\` = '${background}' WHERE \`User_ID\` = ${id}`);
						msg.channel.send('Successfully updated your profile.');
					}
				});
			});
		} catch (e) {
			client.error(msg.content, e);
		}
	};

	// This is the thing that makes you set the emblems and the stuff. Trust me you're gonna want this too
	client.setEmblem = (id, avatar, emblem, amount, msg) => {
		try {
			client.checkUser(id, avatar, () => {
				connection.query(`SELECT COUNT(*) AS hasB FROM \`userE\` WHERE \`userID\` = ${id} AND \`emblem\` = '${emblem}'`, (err1, res1) => {
					if (res1[0].hasB === 0) {
						connection.query(`SELECT *  FROM \`User\` WHERE \`User_ID\` = ${id}`, (err, res) => {
							if (err)
								throw err;
							if (res[0].Credits < amount) {
								msg.channel.send('I\'m sorry you don\'t have enough money for this emblem.');
							} else {
								connection.query(`UPDATE \`User\` SET \`emblem\` = '${emblem}', \`Credits\`=\`Credits\` -${amount} WHERE \`User_ID\` = ${id}`);
								connection.query(`INSERT INTO \`userE\` (\`userID\`, \`emblem\`) VALUES (${id}, '${emblem}')`);
								msg.channel.send('Successfully bought your emblem.');
							}
						});
					} else {
						connection.query(`UPDATE \`User\` SET \`emblem\` = '${emblem}' WHERE \`User_ID\` = ${id}`);
						msg.channel.send('Successfully updated your profile.');
					}
				});
			});
		} catch (e) {
			client.error(msg.content, e);
		}
	};

	// Emote stats updater
	client.emoteCheck = (server_id, emote_id) => {
		try {
			connection.query(`SELECT COUNT(*) AS inD FROM \`emote\` WHERE \`server_id\` = ${server_id} AND \`emote_id\` = ${emote_id}`, (err, res) => {
				if (err)
					throw err;
				if (res[0].inD === 0) {
					connection.query(`INSERT INTO \`emote\` (\`server_id\`, \`emote_id\`) VALUES (${server_id}, ${emote_id})`);
					connection.query(`UPDATE \`emote\` SET \`used\` = \`used\` + 1 WHERE \`server_id\` = ${server_id} AND \`emote_id\` = ${emote_id}`);
				} else {
					connection.query(`UPDATE \`emote\` SET \`used\` = \`used\` + 1 WHERE \`server_id\` = ${server_id} AND \`emote_id\` = ${emote_id}`);
				}
			});
		} catch (e) {
			client.error(e);
		}
	};

	// Search youtube
	client.youtubeSearch = (searchType, type, maxRes, q) => {
		const https = require('https');
		return new Promise((resolve) => {
			https.get(`https://www.googleapis.com/youtube/v3/${searchType}?part=snippet&maxRes=${maxRes}&q=${q}&type=${type}&key=${client.config.youtube.key}`, (res) => {
				let body = '';
				res.on('data', (chunk) => {
					body += chunk;
				});
				res.on('end', () => {
					resolve(body);
				});
			});
		});
	};
  
	client.fetchGuildMember = (msg) => {
		let args = msg.content.slice(client.prefix.length).split(' ');

		if (!args[1])
			return false;
		let m = msg.guild.members.get(args[1]) ||
		msg.guild.members.find((m) => m.displayName.toLowerCase() === args[1].toLowerCase()) ||
		msg.guild.members.find((m) => m.username.toLowerCase() === args[1].toLowerCase());
		return m;

	};
};