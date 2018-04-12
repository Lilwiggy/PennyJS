exports.run = (client, guild, user, Discord, connection) => {
  // These are custom for 3 servers including my own. Please ignore it.
  console.log(`Banned m8`);
  client.checkServer(guild.id, guild.name, guild.iconURL, () => {
    connection.query(`SELECT * FROM \`Servers\` WHERE \`ServerID\` = '${guild.id}'`, (error, results) => {
      if (results[0].mod_log === 1) {
        let channel = guild.channels.get(results[0].mod_channel);
        guild.fetchAuditLogs()
          .then((audit) => {
            let audits = audit.entries.first();
            if (audits.target.id === user.id) {
              let embed = new Discord.RichEmbed()
                .setThumbnail(user.displayAvatarURL)
                .setColor('#f42424')
                .setTitle(`New ban.`)
                .addField(`New ban added.`, `${audits.target.username} was banned by ${audits.executor.username}.`);
              if (audits.reason)
                embed.addField(`Reason:`, audits.reason);
              else
                embed.addField(`Reason:`, `None provided.`);
              if (channel)
                channel.send({ embed });
            }
          });
      }
    });
  });
};
