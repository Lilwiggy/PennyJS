/* eslint-disable linebreak-style */
exports.run = (client, message, args) => {
	// You hate penny? Well shame on you but let me know about it. (Totally not a rip off from notsobot)

	if (args.length === 1) {
		message.channel.send('Usage: //complain [thing to complain about]');
	} else if (message.content.substr(client.prefix.length + 9) > 2047) {
		message.channel.send('no u');
	} else {
		const complain = {
			title: 'New complaint',
			fields: [
				{
					name: `From ${message.author.username}#${message.author.discriminator} on ${message.guild.name}`,
					value: `Channel name: ${message.channel.name}\nChannel ID: ${message.channel.id}\nAuthor ID: ${message.author.id}`
				},
				{
					name: 'Complaint:',
					value: message.content.substr(client.prefix.length + 9)
				}
			],
			thumbnail: { url: message.author.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }) },
			color: 9043849,
		};
		client.channels.cache.get('396008624289349634').send({
			embed: complain,
		});
		message.channel.send('Thank you for your complaint, it has been reported to the proper authorites.');
	}
};
exports.conf = {
	name: 'complain',
	description: 'Complain about Penny.\n"I see all of these message so have fun :)" - Lilwiggy',
	usage: 'complain [complaint]',
	aliases: [],
};
