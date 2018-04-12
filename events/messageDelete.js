exports.run = (client, message, Discord, connection) => {
  if (message.author.bot)
    return;
  client.checkServer(message.guild.id, message.guild.name, message.guild.iconURL, () => {
    connection.query(`SELECT * FROM \`Servers\` WHERE \`ServerID\` = ${message.guild.id}`, (err, res) => {
      if (err)
        throw err;
      if (res[0].mod_log === 1) {
        let channel = res[0].mod_channel;
        let embed = new Discord.RichEmbed();
        let edits = '';
        embed.setThumbnail(message.author.avatarURL);
        embed.setColor('#ff7575');
        embed.setTitle(`Message sent by ${message.author.username} deleted in ${message.channel.name}.`);
        if (message.content.length > 0) {
          if (message.edits) {
            message.edits.reverse().forEach((m) => {
              if (m.content === message.content)
                edits += m;
              else
                edits += `${m} => `;
            });

            // To make sure it fits in the embed
            let editsSplit = edits.match(/.{1,1024}/g);
            editsSplit.forEach((m) => {
              embed.addField(`Edits:`, m);
            });
            let messageSplit = message.content.match(/.{1,1024}/g);
            messageSplit.forEach((m) => {
              embed.addField(`Message:`, m);
            });
          } else {
            embed.addField('Message:', message.content);
          }
        } else {
          embed.addField('Message:', 'Message was most likely an embed.');
        }

        embed.addField('Message ID:', message.id);
        message.guild.channels.get(channel).send({
          embed,
        });
      }
    });
  });
};
