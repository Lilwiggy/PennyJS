/* eslint-disable linebreak-style */
exports.run = (client, message, args) => {
// Basically badges, BUT BETTER IN EVERY WAY!
// Oh also these are a bit more expensive than backgrounds. So ha! Save and spen your monies
	const data = require('../modules/shop.json');
	if (args.length === 1) {
		message.channel.send(`Usage: ${client.prefix}setemblem [emblem]`);
	} else if (data[args[1]] && data[args[1]].type === 'emblem') {
		client.setEmblem(message.author.id, message.author.avatarURL, data[args[1]].name, data[args[1]].price, message);
	} else {
		message.channel.send(`Please use a valid emblem. You can view the options by doing ${client.prefix}shopinfo emblems`);
	}
};


exports.conf = {
	name: 'setemblem',
	description: 'Set your emblem for your profile on Penny.',
	usage: 'setemblem [emblem]',
	aliases: [],
};
