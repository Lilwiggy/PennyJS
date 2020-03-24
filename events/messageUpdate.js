exports.run = (client, oM, nM, Discord, connection) => {
// Run some commands on edits
	let adminP = 'p@';
	let msg = nM.content.toLowerCase();
	// To prevent the robot uprising...
	if (nM.author.bot)
		return;
	if (nM.channel.type !== 'text')
		return;
	if (nM.content === oM.content)
		return;

	// Custom prefix things
	client.checkServer(nM.guild.id, nM.guild.name, nM.guild.iconURL({ size: 2048, dynamic: true }), () => {
		connection.query(`SELECT * FROM \`Servers\` WHERE \`ServerID\` = '${nM.guild.id}'`, (error, prefix) => {
			client.checkUser(nM.author.id, nM.author.displayAvatarURL({ size: 2048, dynamic: true }), () => {
				connection.query(`SELECT * FROM \`User\` WHERE \`User_ID\` = ${nM.author.id}`, (err, res) => {
					if (err)
						throw err;
					client.prefix = prefix[0].Prefix; // set that prefix boi
					try {
						// This is for seeing if the user is blacklisted or not. Some people man smh.
						if (res[0].Blacklisted === 1) {
							return;
						} else {
							// This uh, uhm, yeah it does that one thing where it ignores things with some other bits.
							if (nM.content.indexOf(client.prefix) !== 0)
								return;

							const command = msg.substr(client.prefix.length).split(' ');
							const cmd = client.commands.get(command[0]) || client.commands.get(client.aliases.get(command[0]));
							// And finally we run the command when we get it but we need to be sure the command exists or else it no workie and the bot crashes :(
							if (cmd) {
								try {
									cmd.run(client, nM, args, Discord, connection);
									connection.query(`UPDATE \`User\` SET \`Used\` = \`Used\` + 1 WHERE \`User_ID\` = ${nM.author.id}`);
								} catch (e) {
									client.users.get('232614905533038593').send(`Error:\n${e}\nUsed in:\n${nM.content}`);
								}
							}
						}
					} catch (TypeError) {
						console.log('Hi'); // Somehow this works trust me.
					}
				});


				// Gotta eay at argsbys *funny right?* Seriosuly tho, eat Arby's the food is fantastic and they make good memes on twitter
				const args = nM.content.slice(client.prefix.length).split(' ');

				// Admin commands

				if (msg.startsWith(adminP) && nM.author.id === '232614905533038593') {
					const adminCommand = nM.content.toLowerCase().substr(adminP.length).split(' ');
					const adminCmd = client.adminCommands.get(adminCommand[0]);
					if (adminCmd) {
						try {
							adminCmd.run(client, nM, args, Discord, connection);
						} catch (e) {
							client.users.get('232614905533038593').send(`Error:\n${e}\nUsed in:\n${nM.content}`);
						}
					}
				}
			});// BLACKLISTED
		}); // PREFIX
	});
};
