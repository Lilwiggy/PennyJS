const pm2 = require(`pm2`);
exports.run = (client, message) => {
// Witty comment here
  message.channel.send('Restarting...');
  setTimeout(() => {
    pm2.restart('index.js');
  }, 500);
};


exports.conf = {
  name: 'restart',
  description: '',
  usage: '',
  aliases: [],
};
