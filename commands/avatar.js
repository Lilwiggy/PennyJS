exports.run = (client, message, args, Discord) => {
  // Fun fact:
  // I was retarded before and forgot that I could get the avatar from the user object
  // and made an extra API request to make myself feel special. Good times.
  if (args.length === 1) {
    let embed = new Discord.RichEmbed();
    embed.setTitle(`Your avatar`);
    embed.setImage(message.author.displayAvatarURL);

    message.channel.send(embed);
  } else if (message.mentions.users.first()) {
    let embed = new Discord.RichEmbed();
    embed.setTitle(`${message.mentions.users.first().username}'s avatar`);
    embed.setImage(message.mentions.users.first().displayAvatarURL);

    message.channel.send(embed);
  } else {
    try {
      let user = message.guild.members.find('displayName', message.content.substring(client.prefix.length + 7));
      let embed = new Discord.RichEmbed();
      embed.setTitle(`${message.content.substring(client.prefix.length + 7)}'s avatar`);
      embed.setImage(user.user.displayAvatarURL);

      message.channel.send(embed);
    } catch (TypeError) {
      message.channel.send("I'm sorry, but I could not find that user.");
    }
  }
};

exports.conf = {
  name: 'avatar',
  description: 'Avatar command yip yip!',
  usage: 'avatar',
  aliases: [],
};
