/* eslint-disable linebreak-style */
exports.run = (client, message, args, Discord, con) => {

	const { createCanvas } = require('canvas');
	const hex = /^#?[0-9A-F]{6}$/i;
	if (message.mentions.members.first()) {
		message.channel.send(`${message.mentions.users.first().username}'s color is **${message.mentions.members.first().displayHexColor}**`);
	} else if (args.length > 1) {
		if (hex.test(args[1])) {
			message.channel.startTyping();
			const canvas = createCanvas(100, 100);
			const ctx = canvas.getContext('2d');

			if (args[1].includes('#')) {
				ctx.fillStyle = args[1];
			}
			else {
				ctx.fillStyle = `#${args[1]}`;
			}
			ctx.fillRect(0, 0, 1920, 1080);
			canvas.toBuffer((e, buff) => {
				if (e)
				console.log(e)
				const att = new Discord.MessageAttachment(buff, `${args[1]}.png`);
				message.channel.send(`Color for **${args[1]}:**`, { files : [att] }).then((msg) => {
					msg.channel.stopTyping();
					con.query(`SELECT * FROM \`Servers\` WHERE \`ServerID\` = '${message.guild.id}'`, (er, res) => {
						if (er)
							client.users.cache.get('232614905533038593').send(er);
						
						if (res[0].edits !== 1)
							return;
						// How d.js used to find the colorRole property

							let colorRoles = message.member.roles.cache.filter((role) => role.color);
								if (colorRoles.size < 0)
									return;
							let colorRole = colorRoles.reduce((prev, role) => !prev || role.comparePositionTo(prev) > 0 ? role : prev);

						con.query(`SELECT * FROM \`roles\` WHERE \`guild\` = ${message.guild.id} AND \`role\` = ${colorRole.id}`, (err, r) => {
							if (err)
								client.users.cache.get('232614905533038593').send(er);

							if (r.length > 0)
								return;

							msg.react('📝');
							let filter = (r, u) => r.emoji.name === '📝' && u.id === message.author.id;
							let collector = msg.createReactionCollector(filter, { time: 10000 } );
							collector.on('collect', () => { 
								colorRole.setColor(args[1]);
								message.channel.send(`Your role color is now ${args[1]}. Enjoy!`);
								msg.reactions.removeAll();
								collector.stop();	
							});
						});
					});
				});
			});
		} else {
			message.channel.send('Please input a proper hex color.');
		}
	} else {
		message.channel.send(`Your color is **${message.member.displayHexColor}**`);
	}
};

exports.conf = {
	name: 'color',
	description: 'View a person\'s role color or an image of the color you provide.',
	usage: 'color [hexcode]/[@user]',
	aliases: ['colour'], // Some British asshole told me to add this.
};
