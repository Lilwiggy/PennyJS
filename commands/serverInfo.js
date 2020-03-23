/* eslint-disable linebreak-style */
exports.run = (client, message) => {
	// So this is server stats. It's very boring please find another command to read.
	const embed = {
		thumbnail: { url: message.guild.iconURL() },
		title: message.guild.name,
		color: 9043849,
		footer: { text: 'PennyBot © Lilwiggy 2018' },
		fields: [
			{
				name: 'Guild ID',
				value: message.guild.id
			},
			{
				name: 'Total members:',
				value: message.guild.memberCount
			},
			{
				name: 'Owner',
				value: `${message.guild.owner} | ${message.guild.owner.id}`
			}
		]
	};
	message.channel.send({embed: embed});
};
exports.conf = {
	name: 'serverinfo',
	description: 'Server information.',
	usage: 'serverinfo',
	aliases: ['server info'],
};
