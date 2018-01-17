// I have no clue what this is and I don't play it but someone said add it so I did. True story.
exports.run = (client, message, args, Discord, connection) => {
    if (args.length === 1) {
        message.channel.send('Usage: //osu [username]');
    } else {
        let url = `https://osu.ppy.sh/api/get_user?u=${message.content.substr(client.prefix.length + 4)}&k=${client.config.osu.token}`;
        let https = require('https');

        https.get(url, (res) => {
            let body = '';

            res.on('data', (chunk) => {
                body += chunk;
            });

            res.on('end', () => {
                let data = JSON.parse(body);
                if (!data[0]) {
                    message.channel.send('I could not find that user.');
                } else {
                    let embed = new Discord.RichEmbed()
                    .setTitle(`Profile stats for ${data[0].username}`)
                    .setColor('#89ff89')
                    .setURL(`https://osu.ppy.sh/u/${data[0].user_id}`)
                    .setThumbnail(`https://a.ppy.sh/${data[0].user_id}`)
                    .addField('Username', data[0].username, true)
                    .addField('Rank', data[0].pp_rank, true)
                    .addField('Level', Math.floor(data[0].level), true)
                    .addField('Country', data[0].country, true)
                    .addField('Country rank', data[0].pp_country_rank, true)
                    .addField('PP', Math.floor(data[0].pp_raw), true)
                    .addField('Total score', Math.floor(data[0].total_score), true)
                    .addField('Ranked score', Math.floor(data[0].ranked_score), true)
                    .addField('Accuracy', `${Math.floor(data[0].accuracy)}%`, true);

                    message.channel.send(embed);
                }
            });
        });
    }
};
exports.conf = {
    name: 'osu',
    category: 'Miscelaneous',
    description: 'Find OSU things?',
    usage: 'osu',
    aliases: [],
};
