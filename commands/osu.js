/* eslint-disable linebreak-style */
exports.run = (client, message, args) => {
// I have no clue what this is and I don't play it but someone said add it so I did. True story.
	if (args.length === 1) {
		message.channel.send('Usage: //osu [username]');
	} else {
		const url = `https://osu.ppy.sh/api/get_user?u=${message.content.substr(client.prefix.length + 4)}&k=${client.config.osu.token}`;
		const https = require('https');
		https.get(url, (res) => {
			let body = '';

			res.on('data', (chunk) => {
				body += chunk;
			});

			res.on('end', () => {
				const data = JSON.parse(body);
				if (!data[0]) {
					message.channel.send('I could not find that user.');
				} else {
					const embed = {
						title: `Profile stats for ${data[0].username}`,
						color: 9043849,
						url: `https://osu.ppy.sh/u/${data[0].user_id}`,
						thumbnail: { url: `https://a.ppy.sh/${data[0].user_id}` },
						fields: [
							{
								name: 'Username',
								value: data[0].username,
								inline: true
							},
							{
								name: 'Rank',
								value: data[0].pp_rank,
								inline: true
							},
							{
								name: 'Level',
								value: Math.floor(data[0].level),
								inline: true
							},
							{
								name: 'Country',
								value: data[0].country,
								inline: true
							},
							{
								name: 'Country Rank',
								value: data[0].pp_country_rank,
								inline: true
							},
							{
								name: 'pp',
								value: Math.floor(data[0].pp_raw),
								inline: true
							},
							{
								name: 'Total score',
								value: Math.floor(data[0].total_score),
								inline: true
							},
							{
								name: 'Ranked score',
								value: Math.floor(data[0].ranked_score),
								inline: true
							},
							{
								name: 'Accuracy',
								value: `${Math.floor(data[0].accuracy)}%`,
								inline: true
							}
						]
					};
					message.channel.send({ embed: embed });
				}
			});
		});
	}
};
exports.conf = {
	name: 'osu',
	description: 'Shows OSU! player stats for a user.',
	usage: 'osu [OSU! username]',
	aliases: [],
};
