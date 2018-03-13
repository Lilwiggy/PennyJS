exports.run = (client, member, Discord, connection) => {
  // Should I stay or should I g- oh they left already...
  let guild = member.guild;
  client.checkServer(guild.id, guild.name, guild.iconURL, () => {
    connection.query(`SELECT * FROM \`Servers\` WHERE \`ServerID\` = '${guild.id}'`, (error, results) => {
      if (error)
        throw error;
      if (results[0].Welcome === 1) {
        const channel = member.guild.channels.get(results[0].wc);
        if (channel) {
          if (results[0].LMessage)
            channel.send(`${results[0].LMessage.replace(`{user}`, member.user.username).replace(`{guild}`, guild.name)}`);
          else
            channel.send(`**${member.user.username}** just left **${guild.name}**`);
        }
      }
    });
  });
};
