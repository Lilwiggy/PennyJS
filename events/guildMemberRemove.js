exports.run = (client, member, Discord, connection) => {
  // Should I stay or should I g- oh they left already...
  let guild = member.guild;
  client.checkServer(guild.id, guild.name, guild.iconURL, () => {
    connection.query(`SELECT * FROM \`Servers\` WHERE \`ServerID\` = '${guild.id}'`, (error, results) => {
      if (error)
        throw error;
      if (results[0].Welcome === 1) {
        let channel = member.guild.channels.get(results[0].wc);
        if (channel) {
          if (results[0].LMessage)
            channel.send(`${results[0].LMessage.replace(`{user}`, member.user.username).replace(`{guild}`, guild.name)}`);
          else
            channel.send(`**${member.user.username}** just left **${guild.name}**`);
        }
      }
      if (results[0].mod_log === 1) {
        let channel = guild.channels.get(results[0].mod_channel);
        guild.fetchAuditLogs()
          .then((audit) => {
            let audits = audit.entries.first();
            if (audits.target.id === member.id) {
              if (audits.action === 'MEMBER_KICK') {
                let embed = new Discord.RichEmbed()
                  .setThumbnail(member.user.displayAvatarURL)
                  .setColor('#f96363')
                  .setTitle(`New kick.`)
                  .addField(`New kick added.`, `${audits.target.username} was kicked by ${audits.executor.username}.`);
                if (audits.reason)
                  embed.addField(`Reason:`, audits.reason);
                else
                  embed.addField(`Reason:`, `None provided.`);
                if (channel)
                  channel.send({ embed });
              }
            }
          });
      }
    });
  });
};
