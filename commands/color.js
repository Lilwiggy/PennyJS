/* eslint-disable linebreak-style */
exports.run = (client, message, args, Discord, con) => {

	message.channel.send(`Penny has been having issues lately and the current one is not being able to install node canvas. As such the profile and color commands are down. My apologies and updates will come ASAP over @ https://discord.gg/kwcd9dq`)
	/*const Canvas = require('canvas');
	const hex = /^#?[0-9A-F]{6}$/i;
	if (message.mentions.members.first()) {
		message.channel.send(`${message.mentions.users.first().username}'s color is **${message.mentions.members.first().displayHexColor}**`);
	} else if (args.length > 1) {
		if (hex.test(args[1])) {
			message.channel.startTyping();
			const canvas = new Canvas(100, 100);
			const ctx = canvas.getContext('2d');

			if (args[1].includes('#')) {
				ctx.fillStyle = args[1];
			}
			else {
				ctx.fillStyle = `#${args[1]}`;
			}
			ctx.fillRect(0, 0, 1920, 1080);
			canvas.toBuffer((e, buff) => {
				const att = new Discord.Attachment()
					.setAttachment(buff, `${args[1]}.png`);
				message.channel.send(`Color for **${args[1]}:**`, {file: att}).then((msg) => {
					msg.channel.stopTyping();
					con.query(`SELECT * FROM \`Servers\` WHERE \`ServerID\` = '${message.guild.id}'`, (er, res) => {
						if (er)
							client.users.get('232614905533038593').send(er);
						
						if (res[0].edits !== 1)
							return;
						con.query(`SELECT * FROM \`roles\` WHERE \`guild\` = ${message.guild.id} AND \`role\` = ${message.member.colorRole.id}`, (err, r) => {
							if (err)
								client.users.get('232614905533038593').send(er);

							if (r.length > 0)
								return;
							msg.react('📝');
							let filter = (r, u) => r.emoji.name === '📝' && u.id === message.author.id;
							let collector = msg.createReactionCollector(filter, { time: 10000 } );
							collector.on('collect', () => { 
								message.member.colorRole.setColor(args[1]);
								message.channel.send(`Your role color is now ${args[1]}. Enjoy!`);
								msg.clearReactions();
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
	}*/
};

exports.conf = {
	name: 'color',
	description: 'View a person\'s role color or an image of the color you provide.',
	usage: 'color [hexcode]/[@user]',
	aliases: ['colour'], // Some British asshole told me to add this.
};
