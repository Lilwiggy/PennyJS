/* eslint-disable linebreak-style */
exports.run = (client, message) => {
	message.channel.send('I\'m combat ready! <https://discordapp.com/oauth2/authorize?client_id=309531399789215744&scope=bot&permissions=36809798>');
};

exports.conf = {
	name: 'invite',
	description: 'An invite link to Penny.',
	usage: 'invite',
	aliases: [],
};
