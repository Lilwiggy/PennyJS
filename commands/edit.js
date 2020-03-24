/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
exports.run = (client, message, args, Discord, connection) => {
	// const Canvas = require('canvas');
	const neko = require('nekocurl');
	const role = message.content.slice(client.prefix.length + args[0].length).split(' | ');
	let r_id;
	let edit = true;
	const blacklisted = [];
	const terms = [
		'Really? That\'s what my new color is?',
		'Are you freaking kissing me rn?',
		'You wanna hear it purr?',
		'Go commit smh',
		'My kitty is purring so fast rn',
		'It\'s ya boi, uh skinny penis',
		'Coulda picked a better color tbhtbh',
		'Literally kiss me on the pecker',
		'you\'re mom gay lol',
		'All I did was have sushi with my mom',
		'I\'m trying to mimick my cat rn',
		'Stop sitting on my tiddy >:(',
		'Honestly I only joined for the hentai chat',
		'Pomf pomf kimochi what\'s this sticky stuff on me?',
		'Pomf pomf what are we going to do on the bed?',
	];
		connection.query(`SELECT * FROM \`Servers\` WHERE \`ServerID\` = ${message.guild.id}`, (err, guild) => {
			if (err) {
				throw err;
			}
			if (guild[0].edits === 1) {
				// do shit
				message.guild.roles.cache.filter((guildRole) => {
					if (guildRole.name.toLowerCase() === role[0].toLowerCase().trim()) {
						r_id = guildRole.id;
					}
				});
				connection.query(`SELECT * FROM \`roles\` WHERE \`guild\` = ${message.guild.id}`, (err, res) => {
					if (err) {
						throw err;
					}
					res.forEach((data) => {
						blacklisted.push(data.role);
					});
					if (blacklisted.includes(r_id)) {
						edit = false;
					}
					if (args[1] && role[1]) {
						if (!edit) {
							message.channel.send('Sorry but you aren\'t allowed to edit this role.');
						} else if (message.member.roles.cache.find((r) => r.name.toLowerCase() === role[0].toLowerCase().trim())) {
							message.member.roles.cache.filter((memberRole) => {
								if (memberRole.name.toLowerCase() === role[0].toLowerCase().trim()) {
									const hexThing = /^#[0-9A-F]{6}$/i;
									if (hexThing.test(role[1])) {
										const rtu = memberRole;
										if (rtu.editable) {
											/*
                      const term = terms[Math.floor(Math.random() * terms.length)];
                      const canvas = new Canvas(term.length * 9 + 100, 100);
                      const Image = Canvas.Image;
                      const ctx = canvas.getContext('2d');
                      const img = new Image();
                      ctx.fillStyle = '#36393f';
                      ctx.fillRect(0, 0, term.length * 9 + 100, 100);
                      ctx.font = `16px "Whitney Helvetica Neue"`;
                      ctx.fillStyle = '#fff';
                      ctx.fillText(term, 75, 70);
                      ctx.font = `20px "Whitney Helvetica Neue"`;
                      ctx.fillStyle = role[1];
                      ctx.fillText(message.member.displayName, 75, 45);
                      async function render() {
                        img.src = await neko.get(message.author.displayAvatarURL, {autoString: false});
                        ctx.save();

                        ctx.beginPath();
                        ctx.arc(5 + (60 / 2), 25 + (60 / 2), 60 / 2, 0, Math.PI * 2, false);

                        ctx.clip();
                        ctx.drawImage(img, 5, 25, 60, 60);
                        ctx.restore();
                        canvas.toBuffer((e, buff) => {
                          if (e) {
                            client.users.get(`232614905533038593`).send(`Error:\n${e}`);
                          }
                          const pro = new Discord.Attachment()
                              .setAttachment(buff, `color.png`);
*/
											message.channel.send(`Are you sure you want to update your color to ${role[1]}`, {
												// file: pro,
											}).then((m) => {
												m.react('🇾').then((r) => {
													r.message.react('🇳');
												});

												const filter = (r, user) => user.id === message.author.id;
												const collector = m.createReactionCollector(filter, {time: 60000 * 2});

												collector.on('collect', (r) => {
													r.remove(message.author);
													if (r.emoji.name === '🇾') {
														rtu.setColor(role[1], `Color change requested by ${message.author.username}`);
														message.channel.send(`Your role color is now ${role[1]}. Enjoy!`);
													} else if (r.emoji.name === '🇳') {
														message.channel.send('I will not update your role to this color. To try something better edit your message with your new hex.');
													}
													collector.stop();
												});
												/*
                          });
                        });
                      }
                      render();
                      */
											});
										} else {
											message.channel.send('Coud not edit role. Missing permissions.');
										}
									} else {
										message.channel.send('Please use a valid hex code.');
									}
								}
							});
						} else {
							message.channel.send('You can only edit roles you have!');
						}
					} else {
						message.channel.send(`Usage: ${client.prefix}edit role name | hex`);
					}
				});
			} else {
				message.channel.send('This server has role edits disabled.');
			}
		});
};


exports.conf = {
	name: 'edit',
	description: 'Edit a role\'s color.',
	usage: 'edit role | [hex]',
	aliases: [],
};
