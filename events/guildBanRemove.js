exports.run = (client, guild, user, Discord, connection) => {
  // These are custom for 3 servers including my own. Please ignore it.
  client.checkServer(guild, guild.name, guild.iconURL, () => {
    connection.query(`SELECT * FROM \`Servers\` WHERE \`ServerID\` = ${guild.id}`, (err, res) => {
      if (err)
        throw err;
      if (res[0].mod_log === 1) {
        let channel = guild.channels.get(res[0].mod_channel);
        guild.fetchAuditLogs()
          .then((audit) => {
            let audits = audit.entries.first();
            if (audits.target.id === user.id) {
              let embed = new Discord.RichEmbed()
                .setThumbnail(user.displayAvatarURL)
                .setColor('#89ff89')
                .setTitle(`Ban remove.`)
                .addField(`Ban removed.`, `${audits.target.username} was un-banned by ${audits.executor.username}.`);
              if (channel)
                channel.send({ embed });
            }
          });
      }
    });
  });
};
