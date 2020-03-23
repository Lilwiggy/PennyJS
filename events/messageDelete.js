exports.run = (client, message, Discord, connection) => {
	if (message.author.bot || message.channel.type !== 'text')
		return;
	client.checkServer(message.guild.id, message.guild.name, message.guild.iconURL(), () => {
		connection.query(`SELECT * FROM \`Servers\` WHERE \`ServerID\` = ${message.guild.id}`, (err, res) => {
			if (err)
				throw err;
			if (res[0].mod_log === 1) {
				setTimeout(async() => {
					let channelID = res[0].mod_channel;
					let embed = {
						fields: [],
					};
					let edits = '';
					let logs = await message.guild.fetchAuditLogs();
					if (logs.entries.first().action === 'MESSAGE_DELETE' && logs.entries.first().target.id === message.author.id)
						embed.title = `Message sent by ${message.author.username} deleted in ${message.channel.name} by ${logs.entries.first().executor.username}.`;
					else
						embed.title = `Message sent by ${message.author.username} deleted in ${message.channel.name}.`;
					embed.thumbnail = { url: message.author.avatarURL({ size: 2048 }) };
					embed.color = 16741749;
					if (message.content.length > 0) {
						if (message.edits) {
							message.edits.reverse().forEach((m) => {
								if (m.content === message.content)
									edits += m.content;
								else
									edits += `${m.content} => `;
							});

							// To make sure it fits in the embed
							let editsSplit = edits.match(/.{1,1024}/g);
							editsSplit.forEach((m) => {
								if (m !== message.content)
									embed.fields.push({ name: 'Edits:', value: m });
							});
							let messageSplit = message.content.match(/.{1,1024}/g);
							messageSplit.forEach((m) => {
								embed.fields.push({ name: 'Message:', value: m });
							});
						} else {
							embed.fields.push({ name: 'Message:', value: message.content });
						}
					} else if (message.attachments.first()) {
						embed.fields.push({ name: 'Image:', value: message.attachments.first().url });
					} else {
						embed.fields.push({ name: 'Message:', value: 'Message was most likely an embed.' });
					}

					embed.fields.push({ name: 'Message ID:', value: message.id });
					let channel = message.guild.channels.cache.get(channelID);
					if (channel) {
						channel.send({
							embed,
						});
					}
				}, 3000);
			}
		});
	});
};
