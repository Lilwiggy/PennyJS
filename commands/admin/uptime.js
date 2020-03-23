/* eslint-disable linebreak-style */
exports.run = (client, message) => {
// How long have I been alive?
// Shout out to https://github.com/Gravebot/Gravebot/blob/master/src/commands/info/uptime.js for
// doing the math I didn't wanna do
  const days = Math.floor(process.uptime() / (60 * 60 * 24));
  const hours = Math.floor(process.uptime() / (60 * 60) % 24);
  const minutes = Math.floor(process.uptime() % (60 * 60) / 60);
  const seconds = Math.floor(process.uptime() % 60);
  if (message) {
    message.channel.send(`My uptime: ${days} days ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`);
  } else {
    return `${days} days ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`;
  }
};


exports.conf = {
  name: 'uptime',
  description: 'The amount of time node has been running.',
  usage: 'uptime',
  aliases: [],
};
