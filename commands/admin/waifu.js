const fs = require(`fs`);
exports.run = (client, message, args) => {
// More waifus pls
  if (args.length === 1) {
    message.channel.send('Bruh you forgot the link.');
  } else {
    fs.readFile('waifu.txt', 'utf8', (err, data) => {
      if (err)
        throw err;
      if (data.includes(args[1])) {
        message.channel.send('This image already exists in the file.');
      } else {
        fs.appendFile('waifu.txt', ` | ${args[1]}`, 'utf8', (err1) => {
          if (err1)
            message.channel.send(`Whoops something went wrong.${err}`);
          else
            message.channel.send('Added the link to the Waifu file.');
        });
      }
    });
  }
};


exports.conf = {
  name: 'waifu',
  description: '',
  usage: '',
  aliases: [],
};
