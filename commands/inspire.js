exports.run = (client, message, args, Discord, connection) => {
// Get inspired dude mayn
  var http = require('http');
  var url = `http://inspirobot.me/api?generate=true`;
  http.get(url, (res) => {
    var body = '';

    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      message.channel.send({ file: body });
    });
  });
};

exports.conf = {
  name: 'inspire',
  description: 'Inspire others too',
  usage: 'inspire',
  aliases: [],
};
