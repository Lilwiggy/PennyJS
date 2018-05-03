exports.run = (client, msg) => {
  // msg.channel.send(`View your profile here: https://pennybot.tk/me?userID=${msg.author.id}`);
  msg.channel.send(`This command is currently disabled. Sorry.`);
};
// The most useless command here. Carry on.

exports.conf = {
  name: 'backgrounds',
  description: 'View your backgrounds',
  usage: 'background',
  aliases: [],
  hidden: true,
};
