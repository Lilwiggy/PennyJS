exports.run = (client, message, args) => {
  // This command is for when users are being naughty and need a good ol' ban hammer TO THE FACE!
  if (message.member.hasPermission('BAN_MEMBERS')) {
    if (args.length === 1) {
      message.channel.send(`Usage: ${client.prefix}ban @user`);
    } else if (message.mentions.users.first()) {
      if (message.mentions.users.first().id === '309531399789215744') {
        message.channel.send("I'm sorry, but I can't let you do that."); // Don't even try fam.
      } else if (message.mentions.members.first().bannable) {
        message.mentions.members.first().ban();
        message.channel.send(`**${message.mentions.users.first().username}** was just banned.`, {
          file: 'https://i.makeagif.com/media/6-01-2015/yeWyfV.gif',
        });
      } else {
        message.channel.send(`I'm sorry but I cannot ban that user.`);
      }
    } else {
      message.channel.send('Please mention a valid user.');
    }
  } else {
    message.channel.send('This command is restricted to server mods.');
  }
};

exports.conf = {
  name: 'ban',
  description: 'Ban a user.',
  usage: 'ban @user',
  aliases: ['deport'],
};
