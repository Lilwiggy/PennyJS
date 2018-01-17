// Get inspired dude mayn
exports.run = (client, message, args, Discord, connection) => {
    let http = require('http');
    let url = `http://inspirobot.me/api?generate=true`;

    http.get(url, (res) => {
        let body = '';

        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', () => {
            message.channel.send({file: body});
        });
    });
};

exports.conf = {
    name: 'inspire',
    category: 'Miscelaneous',
    description: 'Inspire others too',
    usage: 'inspire',
    aliases: [],
};
