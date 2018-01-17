// Search doctorbating on urban dictionary
exports.run = (client, message, args, Discord, connection) => {
    if (args.length === 1) {
        message.channel.send('Usage: //define [Term to define]');
    } else {
        let http = require('http');
        let url = `http://api.urbandictionary.com/v0/define?term=${message.content.substring(client.prefix.length + 6)}`;

        http.get(url, (res) => {
            let body = '';

            res.on('data', (chunk) => {
                body += chunk;
            });

            res.on('end', () => {
                let data = JSON.parse(body);

                if (data.result_type !== 'no_results') {
                    if (data.list[0].definition.length > 1024) {
                        message.channel.send("I'm sorry but the definition is too long for me to put in an embed.");
                    } else {
                        let embed = new Discord.RichEmbed()
                        .setColor('#89ff89')
                        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
                        .addField(`Definition for: ${message.content.substring(client.prefix.length + 6)}`, data.list[0].definition);

                        message.channel.send(embed);
                    }
                } else {
                    message.channel.send("It seems that word doesn't have a definition.");
                }
            });
        });
    }
};

exports.conf = {
    name: 'define',
    category: 'Miscelaneous',
    description: 'Defines, things',
    usage: 'define',
    aliases: [],
};
