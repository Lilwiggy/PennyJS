/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
exports.run = (client, message, args) => {
	const commands = [];

	client.commands.forEach((c) => {
		if (c.conf.hidden) {
			return;
		}

		commands.push(c.conf.name);
	});

	const pages = Math.floor(commands.length / 5);

	if (args[1]) {
		if (client.commands.get(args[1])) {
			const cmd = client.commands.get(args[1]) || client.commands.get(client.commands.aliases.get(args[1]));
			if (cmd.conf.hidden) {
				return;
			}
			message.channel.send({embed: {
				title: `Help for ${args[1]}`,
				color: 9043849,
				author: {
					name: 'PennyBot',
					url: null,
					icon_url: client.user.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }),
				},
				fields: [
					{
						name: `Usage for ${args[1]}`,
						value: client.prefix + cmd.conf.usage,
					},
					{
						name: `Description for ${args[1]}`,
						value: cmd.conf.description,
					},
					{
						name: `Aliases for ${args[1]}`,
						value: cmd.conf.aliases.length > 0 ? cmd.conf.aliases.toString() : 'none',
					},
				],

			},
			});
		} else {
			message.channel.send('I couldn\'t find that command, sorry.');
		}
	} else {
		message.channel.send({
			embed: embed(client, commands, 0),
		}).then((msg) => {
			msg.react('⬅').then((e) => {
				e.message.react('➡');
			});
			client.help.set(message.author.id, 0);
			const filter = (r, user) => user.id === message.author.id;
			const collector = msg.createReactionCollector(filter, {time: 60000 * 2});
			collector.on('collect', (r) => {
				r.users.remove(message.author.id);
				if (r.emoji.name === '⬅') {
					if (client.help.get(message.author.id) === 0) {
						client.help.set(message.author.id, pages);
						msg.edit({embed: embed(client, commands, client.help.get(message.author.id))}).catch(console.error);
					} else {
						client.help.set(message.author.id, client.help.get(message.author.id) - 1);
						msg.edit({embed: embed(client, commands, client.help.get(message.author.id))}).catch(console.error);
					}
				} else if (r.emoji.name === '➡') {
					if (client.help.get(message.author.id) === pages) {
						client.help.set(message.author.id, 0);
						msg.edit({embed: embed(client, commands, client.help.get(message.author.id))}).catch(console.error);
					} else {
						client.help.set(message.author.id, client.help.get(message.author.id) + 1);
						msg.edit({embed: embed(client, commands, client.help.get(message.author.id))}).catch(console.error);
					}
				}
			});
			collector.on('end', () => msg.reactions.removeAll().catch(console.error));
		});
	}
};

exports.conf = {
	name: 'help',
	description: 'Does exactly what you expect it to.',
	usage: 'help',
	aliases: [],
};

function embed(client, allC, pos) {
	const c = [];
	for (let i = 0; i < allC.length; i += 5) {
		c.push(allC.slice(i, i + 5));
	}
	const pages = c.length;
	const embed = {
		title: 'Official server',
		author: {
			name: `Page ${pos + 1}/${pages}`,
			url: null,
			icon_url: client.user.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }),
			proxyicon_url: null,
		},
		color: 9043849,
		url: 'https://discord.gg/kwcd9dq',
		footer: {
			text: 'PennyBot © Lilwiggy 2019',
			icon_url: null,
			proxyicon_url: null,
		},
		fields: [],
	};
	c[pos].forEach((e) => {
		embed.fields.push({
			name: client.prefix + client.commands.get(e).conf.name,
			value: client.commands.get(e).conf.description,
		});
	});
	return embed;
}
