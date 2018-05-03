exports.run = (client, message, args, Discord) => {
  // So this is server stats. It's very boring please find another command to read.
  const embed = new Discord.RichEmbed()
    .setThumbnail(message.guild.iconURL)
    .setTitle(message.guild.name)
    .setColor('#89ff89')
    .setFooter('PennyBot © Lilwiggy 2018')
    .addField('Guild ID', message.guild.id)
    .addField('Total members', message.guild.memberCount)
    .addField('Owner', `${message.guild.owner} | ${message.guild.owner.id}`);
  message.channel.send({ embed });
};
exports.conf = {
  name: 'serverinfo',
  description: 'Server information.',
  usage: 'serverinfo',
  aliases: ['server info'],
};
