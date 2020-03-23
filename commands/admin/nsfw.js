/* eslint-disable linebreak-style */
const fs = require(`fs`);
exports.run = (client, message, args) => {
// Add NSFW images
  const images = require(`../../images.json`);
  if (args.length === 1) {
    message.channel.send('Bruh you forgot the link.');
  } else if (images.nsfw.includes(args[1])) {
    message.channel.send(`This image exists already. Fucking moron.`);
  } else {
    images.nsfw.push(args[1]);
    fs.writeFile(`./images.json`, JSON.stringify(images, null, 2), (err) => {
      if (err) {
        message.channel.send(`Something went wrong: ${err}`);
      } else {
        message.channel.send(`Saved NSFW file 👌`);
      }
    });
  }
};


exports.conf = {
  name: 'nsfw',
  description: '',
  usage: '',
  aliases: [],
};
