exports.run = (client, message) => {
// How long have I been alive?
// Shout out to https://github.com/Gravebot/Gravebot/blob/master/src/commands/info/uptime.js for
// doing the math I didn't wanna do
  let days = Math.floor(process.uptime() / (60 * 60 * 24));
  let hours = Math.floor(process.uptime() / (60 * 60));
  let minutes = Math.floor(process.uptime() % (60 * 60) / 60);
  let seconds = Math.floor(process.uptime() % 60);
  if (message)
    message.channel.send(`My uptime: ${days} days ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`);
  else
    return `My uptime: ${days} days ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`;
};


exports.conf = {
  name: 'uptime',
  description: 'The amount of time node has been running.',
  usage: 'uptime',
  aliases: [],
};
