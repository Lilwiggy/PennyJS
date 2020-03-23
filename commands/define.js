/* eslint-disable linebreak-style */
exports.run = (client, message, args) => {
// Search doctorbating on urban dictionary
	if (args.length === 1) {
		message.channel.send(`Usage: ${client.prefix}define [Term to define]`);
	} else {
		const http = require('http');
		const url = `http://api.urbandictionary.com/v0/define?term=${message.content.substring(client.prefix.length + 6).replace('‘', '\'')}`;
		http.get(url, (res) => {
			let body = '';

			res.on('data', (chunk) => {
				body += chunk;
			});

			res.on('end', () => {
				try {
					const data = JSON.parse(body);
					if (data.result_type !== 'no_results') {
						if (data.list[0].definition.length > 1024) {
							message.channel.send('I\'m sorry but the definition is too long for me to put in an embed.');
						} else {
							const embed = {
								color: 9043849,
								footer: { text: `Requested by ${message.author.username}`, 
									icon_url: message.author.displayAvatarURL() },
								fields: [
									{
										name: `Definition for: ${message.content.substring(client.prefix.length + 6)}`,
										value: data.list[0].definition
									}
								]
							};
							message.channel.send({ embed: embed });
						}
					} else {
						message.channel.send('It seems that word doesn\'t have a definition.');
					}
				} catch (SyntaxError) {
					message.channel.send('Sorry something went wrong. This usually happens when people use the ‘ character. Please don\'t do that.');
				}
			});
		});
	}
};

exports.conf = {
	name: 'define',
	description: 'Gets a definition for a word from urban dictionary.',
	usage: 'define [thing to define]',
	aliases: [],
};
