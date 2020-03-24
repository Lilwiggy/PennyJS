/* eslint-disable linebreak-style */
exports.run = (client, message, args, Discord, connection) => {
	// Some tag things
	if (args.length === 1) {
		message.channel.send(`Usage: ${client.prefix + exports.conf.usage}`);
	} else if (args[1] === 'create') {
		if (args[2]) {
			connection.query(`SELECT COUNT(*) AS inD FROM \`tags\` WHERE \`guild\` = ${message.guild.id} AND \`name\` = ${connection.escape(args[2])}`, (err, res) => {
				if (err) {
					client.users.get('232614905533038593').send(`Error in tag check:\n${err}`);
				}
				if (res[0].inD === 0) {
					const content = message.content.substr(12 + client.prefix.length + args[2].length);
					if (client.commands.get(args[2])) {
						message.channel.send('You cannot make a tag with this name.');
					} else if (content.length > 0) {
						connection.query(`SELECT COUNT(*) AS tags FROM \`tags\` WHERE \`guild\` = ${message.guild.id} AND \`owner\` = ${message.author.id}`, (e, r) => {
							if (r[0].tags >= 10) {
								message.channel.send('You have reached the maximum amount of tags for this server!');
								return;
							}

							connection.query(`INSERT INTO \`tags\` (\`guild\`, \`ID\`, \`owner\`, \`name\`, \`content\`) VALUES (${message.guild.id}, '${Date.now().toString(16)}', ${message.author.id}, ${connection.escape(args[2])}, ${connection.escape(content)})`);
							message.channel.send(`Tag ${clean(args[2])} created successfully.`);
						});
					} else {
						message.channel.send('You need to include content in a tag.');
					}
				} else {
					message.channel.send('This tag already exists.');
				}
			});
		} else {
			message.channel.send(`Usage: ${client.prefix}tag create [tag] [tag content]`);
		}
	} else if (args[1] === 'delete') {
		if (args[2]) {
			connection.query(`SELECT COUNT(*) AS inD FROM \`tags\` WHERE \`guild\` = ${message.guild.id} AND \`name\` = ${connection.escape(args[2])}`, (err, res) => {
				connection.query(`SELECT * FROM \`tags\` WHERE \`guild\` = ${message.guild.id} AND \`name\` = ${connection.escape(args[2])}`, (e, tag) => {
					if (err) {
						client.users.get('232614905533038593').send(`Error in tag check:\n${err}`);
					}

					if (res[0].inD === 0) {
						message.channel.send('This tag does not exist');
					} else if (message.member.permissions.has('MANAGE_MESSAGES') || tag[0].owner === message.author.id) {
						connection.query(`DELETE FROM \`tags\` WHERE \`name\` = ${connection.escape(args[2])} AND \`guild\` = ${message.guild.id}`);
						message.channel.send(`Tag ${clean(args[2])} deleted.`);
					} else {
						message.channel.send('You don\'t own this tag.');
					}
				});
			});
		} else {
			message.channel.send(`Usage: ${client.prefix}tag delete [tag]`);
		}
	} else if (args[1] === 'info') {
		if (args[2]) {
			connection.query(`SELECT COUNT(*) AS inD FROM \`tags\` WHERE \`guild\` = ${message.guild.id} AND \`name\` = ${connection.escape(args[2])}`, (err, res) => {
				if (err) {
					client.users.get('232614905533038593').send(`Error in tag check:\n${err}`);
				}

				if (res[0].inD === 0) {
					message.channel.send('That tag does not exist.');
				} else {
					connection.query(`SELECT * FROM \`tags\` WHERE \`name\` = ${connection.escape(args[2])} AND \`guild\` = ${message.guild.id}`, (e, tag) => {
						if (e) {
							client.users.get('232614905533038593').send(`Errock:\n${err}`);
						}

						const user = message.guild.members.get(tag[0].owner);
						if (user) {
							message.channel.send({embed: {
								title: `Tag info for ${args[2]}`,
								color: 9043849,
								thumbnail: {
									url: user.user.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }),
								},
								fields: [
									{
										name: 'Owner',
										value: user.user.username,
									},
									{
										name: 'Tag ID',
										value: tag[0].ID,
									},
									{
										name: 'Uses',
										value: tag[0].used,
									},
								],
							}});
						} else {
							message.channel.send('The owner of this tag has left the server.');
						}
					});
				}
			});
		} else {
			message.channel.send(`Usage: ${client.prefix}tag info [tag]`);
		}
	} else if (args[1] === 'edit') {
		if (args[2] && args[3]) {
			const content = message.content.substr(client.prefix.length + args[0].length + args[1].length + args[2].length + 3);
			connection.query(`SELECT COUNT(*) AS \`inD\`, \`owner\`, \`content\` FROM \`tags\` WHERE \`guild\` = ${message.guild.id} AND \`name\` = ${connection.escape(args[2])}`, (err, res) => {
				if (err) {
					client.users.get('232614905533038593').send(`Error in tag check:\n${err}`);
				}

				if (res[0].inD === 0) {
					message.channel.send('That tag does not exist.');
				} else if (message.author.id === res[0].owner) {
					connection.query(`UPDATE \`tags\` SET \`content\` = ${connection.escape(content)} WHERE \`guild\` = ${message.guild.id} AND \`name\` = ${connection.escape(args[2])}`);
					message.channel.send(`Updated tag ${clean(args[2])}`);
				} else {
					message.channel.send('You do not own this tag!');
				}
			});
		} else {
			message.channel.send(`Usage: ${client.prefix}tag edit [tag] [new tag stuff]`);
		}
	} else if (args[1] === 'vars' || args[1] === 'variables') {
		message.channel.send({embed: {
			title: 'Tag variables',
			color: 9043849,
			author: {
				name: 'PennyBot',
				url: null,
			},
			fields: [
				{
					name: 'User vars',
					value: '{username} - The message author\'s username\n{mentions.username} - The username of the first person mentioned',
				},
			],
		}});
	} else if (args[1] === 'claim') {
		connection.query(`SELECT COUNT(*) AS \`inD\`, \`owner\`, \`content\` FROM \`tags\` WHERE \`guild\` = ${message.guild.id} AND \`name\` = ${connection.escape(args[2])}`, (err, res) => {
			if (err) {
				client.users.get('232614905533038593').send(`Error in tag check:\n${err}`);
			}

			if (res[0].inD === 0) {
				message.channel.send('That tag does not exist.');
			} else if (!message.guild.members.get(res[0].owner)) {
				connection.query(`UPDATE \`tags\` SET \`owner\` = ${message.author.id} WHERE \`guild\` = ${message.guild.id} AND \`name\` = ${connection.escape(args[2])}`);
				message.channel.send(`You now own ${clean(args[2])}. Congrats`);
			} else {
				message.channel.send('The owner of this tag is still here!');
			}
		});
	}
};


exports.conf = {
	name: 'tag',
	description: 'Create/delete/or view info on tags.',
	usage: 'tag [create/delete/info/vars/claim]\nExample tag usage: //hello\nFor tag variables types do //tag var',
	aliases: [],
};

// eslint-disable-next-line require-jsdoc
function clean(text) {
	if (typeof text === 'string') {
		return text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
	} else {
		return text;
	}
}

