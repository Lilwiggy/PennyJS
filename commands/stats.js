/* eslint-disable linebreak-style */
exports.run = (client, message, args, Discord) => {
	const up = client.adminCommands.get('uptime').run();
	const embed = {
		title: 'Penny\'s Website',
		author: {
			name: 'PennyBot',
			icon_url: client.user.avatarURL,
		},
		color: 9043849,
		footer: {
			text: 'PennyBot © Lilwiggy 2018'
		},
		url: 'https://penny.wiggy.dev',
		fields: [ {
			name: 'Stats',
			value: `**Uptime:** ${up}
        \n**Ping:** ${Math.floor(client.ws.ping)}ms
        \n**Total Servers:** ${client.guilds.cache.size}
        \n**Server Prefix:** ${client.prefix}
        \n**FrameWork:** ${Discord.version}
        \n**NodeJS version:** ${process.version.substr(1)}`
		}
		],
	};
	message.channel.send({
		embed: embed,
	});
};


exports.conf = {
	name: 'stats',
	description: 'Penny\'s various stats.',
	usage: 'stats',
	aliases: [],
};
