const https = require(`https`);
let body = '';
exports.run = (client, message) => {
// Witty comment here
  https.get(`https://api.giphy.com/v1/gifs/search?api_key=${client.config.giphy.key}&q=parrot`, (res) => {
    res.on(`data`, (chunk) => {
      body += chunk;
    });
    res.on(`end`, () => {
      let data = JSON.parse(body);
      let i = Math.floor(Math.random() * data.data.length);
      message.channel.send({ file: data.data[i].images.original.url });
      body = '';
    });
  });
};


exports.conf = {
  name: 'parrot',
  description: 'Best command',
  usage: 'parrot',
  aliases: [],
};
