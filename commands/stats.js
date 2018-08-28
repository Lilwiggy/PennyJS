exports.run = (client, message, args, Discord, connection) => {
  connection.query(`SELECT \`Prefix\` FROM \`Servers\` WHERE \`ServerID\` = '${message.guild.id}'`, (error, res) => {
    let pr = res[0].Prefix;
    let days = Math.floor(process.uptime() / (60 * 60 * 24));
    let hours = Math.floor(process.uptime() / (60 * 60));
    let minutes = Math.floor(process.uptime() % (60 * 60) / 60);
    let seconds = Math.floor(process.uptime() % 60);
    const embed = new Discord.RichEmbed()
      .setTitle("Penny's Website")
      .setAuthor('PennyBot', client.user.avatarURL)
      .setColor('#89ff89')
      .setFooter('PennyBot © Lilwiggy 2018')
      .setURL('https://pennybot.tk')
      .addField(`Stats`,
        `**Uptime:** ${days} days ${hours} hours, ${minutes} minutes, and ${seconds} seconds.
        \n**Ping:** ${Math.floor(client.ping)} ms
        \n**Total Servers:** ${client.guilds.size}
        \n**Server Prefix:** ${pr}
        \n**FrameWork:** ${Discord.version}
        \n**NodeJS version:** ${process.version.substr(1)}`, true);
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
