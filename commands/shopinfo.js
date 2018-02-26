exports.run = function(client, message, args, Discord) {
// Info about our dugs I mean shop info.
  const data = require('../modules/shop.json');
  let emblems = [];
  let backgrounds = [];
  Object.keys(data).forEach((x) => {
    if (data[x].type === 'background')
      backgrounds.push(data[x].name);
    else if (data[x].type === 'emblem')
      emblems.push(data[x].name);
  });
  let bg = backgrounds.toString().replace(/,/g, ` | `);
  let em = emblems.toString().replace(/,/g, ` | `);
  if (args.length === 1) {
    message.channel.send(`Usage: ${client.prefix}shopinfo [item/type]`);
  } else if (args[1].toLowerCase() === 'emblems' || args[1].toLowerCase() === 'emblem') {
    var embed = new Discord.RichEmbed()
      .addField(`Shop items for emblems. Use ${client.prefix}shopinfo [item] for more info.`, `**${em}**`)
      .setColor('#89ff89');
    message.channel.send({ embed });
  } else if (args[1].toLowerCase() === 'backgrounds' || args[1].toLowerCase() === 'background') {
    var embed = new Discord.RichEmbed()
      .addField(`Shop items for backgrounds. Use ${client.prefix}shopinfo [item] for more info.`, `**${bg}**`)
      .setColor('#89ff89');
    message.channel.send({ embed });
  } else if (data[`${args[1]}`]) {
    var embed = new Discord.RichEmbed()
      .addField(`Shop info for ${data[`${args[1]}`].name}'s ${data[`${args[1]}`].type}.`, `**Price**: ${data[`${args[1]}`].price} credits.\n**Purchase**: ${client.prefix}set${data[`${args[1]}`].type} ${data[`${args[1]}`].name}`)
      .setImage(data[`${args[1]}`].image)
      .setColor('#89ff89');
    message.channel.send({ embed });
  } else {
    message.channel.send('Shop info not found.');
  }
};

exports.conf = {
  name: 'shopinfo',
  description: 'Drug info. I mean shop info.',
  usage: 'shop info',
  aliases: [],
};
