/* eslint-disable linebreak-style */
const fs = require(`fs`);
exports.run = (client, message, args) => {
  // Bad

  const things = message.content.substr(args[0].length + 3);
  const images = require(`../../modules/embarrass.json`);
  if (args.length === 1) {
    message.channel.send('Bruh you forgot the stuff.');
  } else if (images.things.includes(things)) {
    message.channel.send(`This is in here already, moron.`);
  } else {
    images.things.push(things);
    fs.writeFile(`./modules/embarrass.json`, JSON.stringify(images, null, 2), (err) => {
      if (err) {
        message.channel.send(`Something went wrong: ${err}`);
      } else {
        message.channel.send(`Saved embarrass file 👌`);
      }
    });
  }
};


exports.conf = {
  name: 'embarrass',
  description: '',
  usage: '',
  aliases: [],
};
