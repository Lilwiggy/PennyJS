exports.run = (client, message, args, Discord, connection) => {
  connection.query(`SELECT \`Prefix\` FROM \`Servers\` WHERE \`ServerID\` = '${message.guild.id}'`, (error, res) => {
    let pr = res[0].Prefix;
    const embed = new Discord.RichEmbed()
      .setTitle("Penny's Website")
      .setAuthor('PennyBot', client.user.avatarURL)
      .setColor('#89ff89')
      .setFooter('PennyBot © Lilwiggy 2018')
      .setURL('https://pennybot.tk')
      .addField(`Stats`, `<:penny:335563810691743746> **Total servers:** ${client.guilds.size}\n<:ruby:335563882309615627> **Ping:** ${Math.floor(client.ping)} ms\n<:weiss:335563894435348482> **Total members:** ${client.users.size}\n<:blake:342465311624134656> **Server prefix:** ${pr}\n<:yang:335563905906769942> **FrameWork:** Discord.js ${Discord.version}\n<:qrow:335563858364071936> **Node.js version:** ${process.version.substr(1)}`, true);
    message.channel.send({
      embed,
    });
  });
};


exports.conf = {
  name: 'stats',
  description: 'Cool stats n shiz',
  usage: 'stats',
  aliases: [],
};
