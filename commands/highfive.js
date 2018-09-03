exports.run = (client, message, args) => {
// HIGH FI!
  if (args.length === 1) {
    message.channel.send("You can't highfive yourself. (That's sad)");
  } else if (message.mentions.users.first()) {
    if (message.mentions.users.first().id === message.author.id) {
      message.channel.send("You can't highfive yourself. (That's sad)");
    } else {
      message.channel.send(`${message.author.username} just high-fived ${message.mentions.users.first().username}`, {
        file: 'http://pennybot.tk/assets/highfive.gif',
      });
    }
  } else {
    message.channel.send('Please mention a valid user.');
  }
};
exports.conf = {
  name: 'highfive',
  description: 'Give someone a highfive.',
  usage: 'highfive [@user]',
  aliases: [],
};
