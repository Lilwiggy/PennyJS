const fs = require(`fs`);
exports.run = (client, message, args) => {
// Adds things to the NSFW file
  if (args.length === 1) {
    message.channel.send('Bruh you forgot the link.');
  } else {
    fs.readFile('nsfw.txt', 'utf8', (err, data) => {
      if (err)
        throw err;
      if (data.includes(args[1])) {
        message.channel.send('This image already exists in the file.');
      } else {
        fs.appendFile('nsfw.txt', ` | ${args[1]}`, 'utf8', (err1) => {
          if (err1)
            message.channel.send('Whoops something went wrong.');
          else
            message.channel.send('Added the link to the NSFW file.');
        });
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
