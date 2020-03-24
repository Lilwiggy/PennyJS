/* eslint-disable linebreak-style */
exports.run = (client, message) => {
// Mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm yes
	if (!message.guild.me.hasPermission('MANAGE_WEBHOOKS')) {
		message.channel.send('I don\'t have permissions to make a webhook. Please change this in your guild settings.');
		return;
	}
	message.channel.createWebhook(message.author.username, { avatar: message.author.displayAvatarURL({ size: 2048, dynamic: true }) }).then((hook) => {
		const stuff = require('../modules/embarrass.json');
		const yes = stuff.things[Math.floor(Math.random() * stuff.things.length)];
		hook.send(yes).then(() => hook.delete());
	}).catch(() => {
		message.channel.fetchWebhooks().then((hooks) => {
			hooks.first().delete();
			message.channel.createWebhook(message.author.username, message.author.displayAvatarURL({ size: 2048, dynamic: true })).then((hook) => {
				const stuff = require('../modules/embarrass.json');
				const yes = stuff.things[Math.floor(Math.random() * stuff.things.length)];
				hook.send(yes).then(() => hook.delete());
			});
		});
	});
};

exports.conf = {
	name: 'embarrass',
	description: 'Yes',
	usage: 'Yes',
	aliases: ['suck'],
	hidden: true,
};
