exports.run = (client, message, args, Discord) => {
  // Stalker
  if (args[1]) {
    if (args[1] === 'avatar') {
      var hi = client.users.array();
      var usr = hi[`${Math.floor(Math.random() * client.users.size)}`];
      var embed = new Discord.RichEmbed();
      embed.setTitle(`Random avatar from ${usr.username}`);
      if (usr.displayAvatarURL.includes('.gif'))
        embed.setImage(`${usr.displayAvatarURL}&.gif`);
      else
        embed.setImage(usr.displayAvatarURL);


      embed.setColor('#89ff89');
      message.channel.send({ embed });
    }
  }
};


exports.conf = {
  name: 'random',
  description: 'Get a random avatar',
  usage: 'random avatar',
  aliases: [],
}
;
