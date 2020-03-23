/* eslint-disable linebreak-style */
exports.run = (client, message, args) => {
	// Trade some stuff with some people
	if (message.author.id !== '232614905533038593')
		if (!args[1]) {
			message.channel.send(`Usage: ${client.prefix}trade [waifu/credits] @user`);
			return;
		}

	if (!message.mentions.users.first()) {
		message.channel.send('Please mention a valid user.');
		return;
	}
};

exports.conf = {
	name: 'trade',
	description: 'Trade with another user!',
	usage: 'trade [waifu/credits] @user',
	aliases: [],
	hidden: true
};
