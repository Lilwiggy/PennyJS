exports.run = (client, message, args, Discord, connection) => {
// This is actually kinda hot - Uninvited
  var http = require('http');
  var url = `https://thiscatdoesnotexist.com/`;

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
  name: 'cat',
  description: 'Posts a "Non Existent" cat.',
  usage: 'cat',
  aliases: [],
};



