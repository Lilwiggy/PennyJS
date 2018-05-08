exports.run = (client, message) => {
  // I know what you're doing here ( ͡° ͜ʖ ͡°)
  if (!message.channel.nsfw) {
    message.channel.send(`This channel is not marked as NSFW.`);
  } else {
    let images = require(`../images.json`);
    let response = images.nsfw[Math.floor(Math.random() * images.nsfw.length)];
    message.channel.send({ file: response });
  }
};

exports.conf = {
  name: 'nsfw',
  description: '( ͡° ͜ʖ ͡°)',
  usage: 'nsfw',
  aliases: [],
};
