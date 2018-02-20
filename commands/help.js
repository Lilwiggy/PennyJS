exports.run = function(client, message, args, Discord, connection) {
  if (args.length === 1) {
    var embed = new Discord.RichEmbed()
      .setTitle(`Official server`)
      .setAuthor(`Commands`)
      .setColor(`#89ff89`)
      .setURL(`https://discord.gg/kwcd9dq`)
      .setFooter(`PennyBot © Lilwiggy 2018`)
      .addField(`Fun commands`, `${client.prefix}help fun`)
      .addField(`Mod commands`, `${client.prefix}help mod`)
      .addField(`Profile commands`, `${client.prefix}help profile`)
      .addField(`Social commands`, `${client.prefix}help social`)
      .addField(`Other commands`, `${client.prefix}help other`);
    message.channel.send({
      embed,
    });
  } else if (args[1] === `fun`) {
    const embed = new Discord.RichEmbed()
      .setTitle(`Official server`)
      .setAuthor(`Commands`)
      .setColor(`#89ff89`)
      .setURL(`https://discord.gg/kwcd9dq`)
      .setFooter(`PennyBot © Lilwiggy 2018`)
      .addField(`${client.prefix}waifu`, `Wiggy is weird okay.`)
      .addField(`${client.prefix}nsfw waifu`, `Only works in NSFW marked chats.`)
      .addField(`${client.prefix}slap`, `Slaps the first user mentioned.`)
      .addField(`${client.prefix}highfive`, `Highfives the first user mentioned.`)
      .addField(`${client.prefix}gamble`, 'Wanna gamble your money go ahead but don`t come to me complaining when...')
      .addField(`${client.prefix}define`, `Searches Urban Dictionary for a word.`)
      .addField(`${client.prefix}osu`, `Some OSU stats.`)
      .addField(`${client.prefix}complain`, `Comaplin about Penny. We appreciate the feedback.`)
      .addField(`${client.prefix}inspire`, `Be inspired by these amazing quotes.`)
      .addField(`${client.prefix}random avatar`, `I like ~~stalking people~~ finding random avatars. You do too, now.`);
    message.channel.send({
      embed,
    });
  } else if (args[1] === `mod`) {
    const embed = new Discord.RichEmbed()
      .setTitle(`Official server`)
      .setAuthor(`Commands`)
      .setColor(`#89ff89`)
      .setURL(`https://discord.gg/kwcd9dq`)
      .setFooter(`PennyBot © Lilwiggy 2018`)
      .addField(`${client.prefix}kick`, `Kicks the first user mentioned.`)
      .addField(`${client.prefix}ban`, `Bans the first user mentioned.`)
      .addField(`${client.prefix}delete`, `Deletes X number of messages.`)
      .addField(`${client.prefix}welcome`, `Toggles welcome messages on or off.`)
      .addField(`${client.prefix}set welcome channel`, `Selects the channel to welcome new users.`)
      .addField(`${client.prefix}set leave message`, `Sets custom leave message.`)
      .addField(`${client.prefix}set welcome message`, `Sets custom welcome message.`)
      .addField(`${client.prefix}set prefix`, `Sets custom prefix for the server.`)
      .addField(`${client.prefix}enable levels`, `Enable levels.`)
      .addField(`${client.prefix}disable levels`, `Disable levels.`);
    message.channel.send({
      embed,
    });
  } else if (args[1] === `profile`) {
    const embed = new Discord.RichEmbed()
      .setTitle(`Official server`)
      .setAuthor(`Commands`)
      .setColor(`#89ff89`)
      .setURL(`https://discord.gg/kwcd9dq`)
      .setFooter(`PennyBot © Lilwiggy 2018`)
      .addField(`${client.prefix}profile`, 'Shows the user`s profile.')
      .addField(`${client.prefix}setbackground`, `Sets custom background.`)
      .addField(`${client.prefix}setemblem`, `Sets custom emblem.`)
      .addField(`${client.prefix}backgrounds`, `Links your profile online to view which backgrounds you own.`)
      .addField(`${client.prefix}credits`, `Shows your credit amount.`);

    message.channel.send({
      embed,
    });
  } else if (args[1] === `social`) {
    const embed = new Discord.RichEmbed()
      .setTitle(`Official server`)
      .setAuthor(`Commands`)
      .setColor(`#89ff89`)
      .setURL(`https://discord.gg/kwcd9dq`)
      .setFooter(`PennyBot © Lilwiggy 2018`)
      .addField(`${client.prefix}daily`, `Gives you your daily 500 credits.`)
      .addField(`${client.prefix}cookie`, `Gives a cookie to the first user mentioned.`)
      .addField(`${client.prefix}emblem`, `RWBY emblems!`)
      .addField(`${client.prefix}serverinfo`, `Displays information about the server.`);
    message.channel.send({
      embed,
    });
  } else if (args[1] === `other`) {
    const embed = new Discord.RichEmbed()
      .setTitle(`Official server`)
      .setAuthor(`Commands`)
      .setColor(`#89ff89`)
      .setURL(`https://discord.gg/kwcd9dq`)
      .setFooter(`PennyBot © Lilwiggy 2018`)
      .addField(`${client.prefix}invite`, `Sends an invite like for Penny.`)
      .addField(`${client.prefix}help`, `Does exactly what you think it does.`)
      .addField(`${client.prefix}stats`, 'Shows the Penny`s stats.')
      .addField(`${client.prefix}ht`, `Test your luck with a little heads or tails.`)
      .addField(`${client.prefix}translate`, `Translates stuff. Usage: //translate spanish | Hello World`);
    message.channel.send({
      embed,
    });
  }
};

exports.conf = {
  name: `help`,
  description: `Who you gonna call?`,
  usage: `help`,
  aliases: [],
};
