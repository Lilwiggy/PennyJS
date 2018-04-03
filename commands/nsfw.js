const fs = require(`fs`);
exports.run = (client, message) => {
// Witty comment here
  if (message.channel.nsfw) {
    // WEW
    fs.readFile('nsfw.txt', 'utf8', (err, data) => {
      if (err)
        throw err;
      let responses = data.split(' | ');
      let response = responses[Math.floor(Math.random() * responses.length)];
      message.channel.send({ file: response });
    });
  } else {
    message.channel.send("I'm sorry but you must do this in an nsfw channel.");
  }
};


exports.conf = {
  name: 'nsfw',
  description: '',
  usage: '',
  aliases: [],
};
