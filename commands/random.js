/* eslint-disable linebreak-style */
exports.run = (client, message) => {
	// Stalker

	const hi = client.users.cache.array();
	const usr = hi[`${Math.floor(Math.random() * client.users.cache.size)}`];
	const embed = {};
	embed.title = `Random avatar from ${usr.username}`;
	embed.image = { url: usr.displayAvatarURL({ size: 2048, dynamic: true }) };


	embed.color = 9043849;
	message.channel.send({ embed: embed });
};


exports.conf = {
	name: 'random',
	description: 'Get a random avatar',
	usage: 'random avatar',
	aliases: [],
}
;
