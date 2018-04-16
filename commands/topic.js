exports.run = (client, message) => {
  var fs = require('fs');
  fs.readFile('starters.txt', 'utf-8', (err, data) => {
    if (err)
      throw err;
    var topics = data.split(' | ');
    var topic = topics[Math.floor(Math.random() * topics.length)];
    message.channel.send(topic);
  });
};


exports.conf = {
  name: 'topic',
  description: 'Topics',
  usage: 'topic',
  aliases: [],
};
