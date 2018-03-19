exports.run = (client, message, args, Discord) => {
// Info about our dugs I mean shop info.
  const data = require('../modules/shop.json');
  let emblems = [];
  let backgrounds = [];
  let shop = Object.keys(data);
  shop.forEach((x) => {
    if (data[x].type === 'background')
      backgrounds.push(data[x].name);
    else if (data[x].type === 'emblem')
      emblems.push(data[x].name);
  });
  if (args.length === 1) {
    message.channel.send(`Usage: ${client.prefix}shopinfo [backgrounds/emblems/all]`);
  } else if (args[1] === 'all') {
    client.shopAll.set(message.author.id, 0);
    message.channel.send(newEmbed(client, Discord, data, shop, message.author.id, 'all')).then((msg) => {
      msg.react('⬅').then((e) => {
        e.message.react('➡');
      });
      const filter = (r, user) => user.id === message.author.id;
      const collector = msg.createReactionCollector(filter, { time: 60000 * 2 });
      collector.on('collect', (r) => {
        if (r.emoji.name === '⬅') {
          r.remove(message.author.id);
          if (client.shopAll.get(message.author.id) === 0) {
            client.shopAll.set(message.author.id, shop.length - 1);
            msg.edit(newEmbed(client, Discord, data, shop, message.author.id, 'all')).catch(console.error);
          } else {
            client.shopAll.set(message.author.id, client.shopAll.get(message.author.id) - 1);
            msg.edit(newEmbed(client, Discord, data, shop, message.author.id, 'all')).catch(console.error);
          }
        } else if (r.emoji.name === '➡') {
          r.remove(message.author.id);
          if (client.shopAll.get(message.author.id) === shop.length - 1) {
            client.shopAll.set(message.author.id, 0);
            msg.edit(newEmbed(client, Discord, data, shop, message.author.id, 'all')).catch(console.error);
          } else {
            client.shopAll.set(message.author.id, client.shopAll.get(message.author.id) + 1);
            msg.edit(newEmbed(client, Discord, data, shop, message.author.id, 'all')).catch(console.error);
          }
        }
      });
      collector.on('end', () => msg.delete());
    });
  } else if (args[1] === 'backgrounds') {
    client.shopBackgrounds.set(message.author.id, 0);
    message.channel.send(newEmbed(client, Discord, data, backgrounds, message.author.id, 'backgrounds')).then((msg) => {
      msg.react('⬅').then((e) => {
        e.message.react('➡');
      });
      const filter = (r, user) => user.id === message.author.id;
      const collector = msg.createReactionCollector(filter, { time: 60000 * 2 });
      collector.on('collect', (r) => {
        r.remove(message.author.id);
        if (r.emoji.name === '⬅') {
          if (client.shopBackgrounds.get(message.author.id) === 0) {
            client.shopBackgrounds.set(message.author.id, backgrounds.length - 1);
            msg.edit(newEmbed(client, Discord, data, backgrounds, message.author.id, 'backgrounds')).catch(console.error);
          } else {
            client.shopBackgrounds.set(message.author.id, client.shopBackgrounds.get(message.author.id) - 1);
            msg.edit(newEmbed(client, Discord, data, backgrounds, message.author.id, 'backgrounds')).catch(console.error);
          }
        } else if (r.emoji.name === '➡') {
          if (client.shopBackgrounds.get(message.author.id) === backgrounds.length - 1) {
            client.shopBackgrounds.set(message.author.id, 0);
            msg.edit(newEmbed(client, Discord, data, backgrounds, message.author.id, 'backgrounds')).catch(console.error);
          } else {
            client.shopBackgrounds.set(message.author.id, client.shopBackgrounds.get(message.author.id) + 1);
            msg.edit(newEmbed(client, Discord, data, backgrounds, message.author.id, 'backgrounds')).catch(console.error);
          }
        }
      });
      collector.on('end', () => msg.delete());
    });
  } else if (args[1] === 'emblems') {
    client.shopEmblems.set(message.author.id, 0);
    message.channel.send(newEmbed(client, Discord, data, emblems, message.author.id, 'emblems')).then((msg) => {
      msg.react('⬅').then((e) => {
        e.message.react('➡');
      });
      const filter = (r, user) => user.id === message.author.id;
      const collector = msg.createReactionCollector(filter, { time: 60000 * 2 });
      collector.on('collect', (r) => {
        r.remove(message.author.id);
        if (r.emoji.name === '⬅') {
          if (client.shopEmblems.get(message.author.id) === 0) {
            client.shopEmblems.set(message.author.id, emblems.length - 1);
            msg.edit(newEmbed(client, Discord, data, emblems, message.author.id, 'emblems')).catch(console.error);
          } else {
            client.shopBackgrounds.set(message.author.id, client.shopEmblems.get(message.author.id) - 1);
            msg.edit(newEmbed(client, Discord, data, emblems, message.author.id, 'emblems')).catch(console.error);
          }
        } else if (r.emoji.name === '➡') {
          if (client.shopEmblems.get(message.author.id) === emblems.length - 1) {
            client.shopEmblems.set(message.author.id, 0);
            msg.edit(newEmbed(client, Discord, data, emblems, message.author.id, 'emblems')).catch(console.error);
          } else {
            client.shopBackgrounds.set(message.author.id, client.shopEmblems.get(message.author.id) + 1);
            msg.edit(newEmbed(client, Discord, data, emblems, message.author.id, 'emblems')).catch(console.error);
          }
        }
      });
      collector.on('end', () => msg.delete().catch(console.error));
    }).catch(console.error);
  } else {
    message.channel.send(`Usage: ${client.prefix}shopinfo [backgrounds/emblems/all]`);
  }
};

function newEmbed(client, Discord, data, shop, id, type) {
  if (type === 'all') {
    return new Discord.RichEmbed()
      .setTitle(`Shop info for ${shop[client.shopAll.get(id)]}`)
      .addField(`Price:`, data[shop[client.shopAll.get(id)]].price)
      .addField(`Purchase:`, `${client.prefix}set${data[shop[client.shopAll.get(id)]].type} ${shop[client.shopAll.get(id)]}`)
      .setColor(`#89ff89`)
      .setImage(data[shop[client.shopAll.get(id)]].image);
  } else if (type === 'backgrounds') {
    return new Discord.RichEmbed()
      .setTitle(`Shop info for ${shop[client.shopBackgrounds.get(id)]}`)
      .addField(`Price:`, data[shop[client.shopBackgrounds.get(id)]].price)
      .addField(`Purchase:`, `${client.prefix}setbackground ${shop[client.shopBackgrounds.get(id)]}`)
      .setColor(`#89ff89`)
      .setImage(data[shop[client.shopBackgrounds.get(id)]].image);
  } else if (type === 'emblems') {
    return new Discord.RichEmbed()
      .setTitle(`Shop info for ${shop[client.shopEmblems.get(id)]}`)
      .addField(`Price:`, data[shop[client.shopEmblems.get(id)]].price)
      .addField(`Purchase:`, `${client.prefix}setemblem ${shop[client.shopEmblems.get(id)]}`)
      .setColor(`#89ff89`)
      .setImage(data[shop[client.shopEmblems.get(id)]].image);
  }
}

exports.conf = {
  name: 'shopinfo',
  description: 'Drug info. I mean shop info.',
  usage: 'shop info',
  aliases: [],
};
