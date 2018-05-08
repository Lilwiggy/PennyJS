exports.run = (client, message, args, Discord) => {
  // This command is best girl. Just sayin'

  let images = require(`../images.json`);
  let response = images.waifu[Math.floor(Math.random() * images.waifu.length)];

  var embed = new Discord.RichEmbed()
    .setColor('#89ff89')
    .setTitle('I approve.')
    .setImage(response);
  message.channel.send({ embed });
};

exports.conf = {
  name: 'waifu',
  description: 'All best girls',
  usage: 'waifu',
  aliases: [],
};
