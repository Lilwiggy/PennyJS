/* eslint-disable linebreak-style */
exports.run = (client, message) => {
// HIGH FI!
	let user = client.fetchGuildMember(message) || message.author;
	if (user.id === message.author.id) {
		message.channel.send('You can\'t highfive yourself. (That\'s sad)');
		return;
	}   
	if (user) {
		message.channel.send(`${message.author.username} just high-fived ${user.user.username}`, {
			files: ['https://thumbs.gfycat.com/ElaborateAccurateFerret-small.gif'],
		});
	} else {
		message.channel.send('Please mention a valid user.');
	}
};
exports.conf = {
	name: 'highfive',
	description: 'Give someone a highfive.',
	usage: 'highfive [@user]',
	aliases: [],
};
