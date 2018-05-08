const fs = require(`fs`);
exports.run = (client, message, args) => {
// More waifus pls
  let images = require(`../../images.json`);
  if (args.length === 1) {
    message.channel.send('Bruh you forgot the link.');
  } else if (images.waifu.includes(args[1])) {
    message.channel.send(`This image exists already. Fucking moron.`);
  } else {
    images.waifu.push(args[1]);
    fs.writeFile(`./images.json`, JSON.stringify(images, null, 2), (err) => {
      if (err)
        message.channel.send(`Something went wrong: ${err}`);
      else
        message.channel.send(`Saved waifu file 👌`);
    });
  }
};


exports.conf = {
  name: 'waifu',
  description: '',
  usage: '',
  aliases: [],
};
