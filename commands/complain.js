exports.run = (client, message, args, Discord) => {
  // You hate penny? Well shame on you but let me know about it. (Totally not a rip off from notsobot)

  if (args.length === 1) {
    message.channel.send('Usage: //complain [thing to complain about]');
  } else if (message.content.substr(client.prefix.length + 9) > 2047) {
    message.channel.send(`no u`);
  } else {
    var complain = new Discord.RichEmbed()
      .setTitle(`New complaint`)
      .addField(`From ${message.author.username + message.author.discriminator} on ${message.guild.name}`, `Channel name: ${message.channel.name}\nChannel ID: ${message.channel.id}\nAuthor ID: ${message.author.id}`)
      .setColor('#89ff89')
      .addField('Complaint:', message.content.substr(client.prefix.length + 9))
      .setThumbnail(message.author.displayAvatarURL);
    client.channels.get('396008624289349634').send({
      embed: complain,
    });
    message.channel.send('Thank you for your complaint, it has been reported to the proper authorites.');
  }
};
exports.conf = {
  name: 'complain',
  description: 'W-why would you hate me? :(',
  usage: 'complain',
  aliases: [],
};
