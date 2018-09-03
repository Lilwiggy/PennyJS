exports.run = (client, message, args, Discord, connection) => {
  connection.query(`SELECT \`Prefix\` FROM \`Servers\` WHERE \`ServerID\` = '${message.guild.id}'`, (error, res) => {
    let pr = res[0].Prefix;
    let up = client.adminCommands.get(`uptime`).run();
    const embed = new Discord.RichEmbed()
      .setTitle("Penny's Website")
      .setAuthor('PennyBot', client.user.avatarURL)
      .setColor('#89ff89')
      .setFooter('PennyBot © Lilwiggy 2018')
      .setURL('https://pennybot.tk')
      .addField(`Stats`,
        `**Uptime:** ${up}
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
  description: 'Penny\'s various stats.',
  usage: 'stats',
  aliases: [],
};
