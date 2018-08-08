exports.run = (client, message, Discord, connection) => {
  if (message.author.bot)
    return;
  client.checkServer(message.guild.id, message.guild.name, message.guild.iconURL, () => {
    connection.query(`SELECT * FROM \`Servers\` WHERE \`ServerID\` = ${message.guild.id}`, (err, res) => {
      if (err)
        throw err;
      if (res[0].mod_log === 1) {
        setTimeout(async() => {
          let channelID = res[0].mod_channel;
          let embed = new Discord.RichEmbed();
          let edits = '';
          let logs = await message.guild.fetchAuditLogs();
          if (logs.entries.first().action === 'MESSAGE_DELETE' && logs.entries.first().target.id === message.author.id)
            embed.setTitle(`Message sent by ${message.author.username} deleted in ${message.channel.name} by ${logs.entries.first().executor.username}.`);
          else
            embed.setTitle(`Message sent by ${message.author.username} deleted in ${message.channel.name}.`);
          embed.setThumbnail(message.author.avatarURL);
          embed.setColor('#ff7575');
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
                if (m !== message.content)
                  embed.addField(`Edits:`, m);
              });
              let messageSplit = message.content.match(/.{1,1024}/g);
              messageSplit.forEach((m) => {
                embed.addField(`Message:`, m);
              });
            } else {
              embed.addField('Message:', message.content);
            }
          } else if (message.attachments.first()) {
            embed.addField('Image:', message.attachments.first().url);
          } else {
            embed.addField('Message:', 'Message was most likely an embed.');
          }

          embed.addField('Message ID:', message.id);
          let channel = message.guild.channels.get(channelID);
          if (channel) {
            channel.send({
              embed,
            });
          }
        }, 3000);
      }
    });
  });
};
