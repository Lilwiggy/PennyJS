exports.run = (client, message, args, Discord, connection) => {
  // Ignore roles for the edit role command
  let roles = message.content.slice(client.prefix.length + args[0].length).split('|');
  if (args.length === 1) {
    message.channel.send(`Usage: ${client.prefix}blacklist @role\n${client.prefix}blacklist Role 1 | Role 2 | Role 3`);
  } else if (message.member.permissions.has(`ADMINISTRATOR`)) {
    if (message.mentions.roles.first()) {
      message.mentions.roles.forEach((role) => {
        addRole(connection, role.id, message.guild.id);
        message.channel.send(`Added ${role.name} to the blacklist.`);
      });
    } else {
      roles.forEach((role) => {
        message.guild.roles.filter((guildRole) => {
          if (guildRole.name.toLowerCase() === role.toLowerCase().trim()) {
            addRole(connection, guildRole.id, message.guild.id);
            message.channel.send(`Added ${role} to the blacklist.`);
          }
        });
      });
    }
  } else {
    message.channel.send(`This command is restricted to server admins.`);
  }
};


exports.conf = {
  name: 'blacklist',
  description: '',
  usage: '',
  aliases: [],
};

function addRole(con, r_id, g_id) {
  con.query(`SELECT COUNT(*) AS \`count\`, \`role\`, \`guild\` FROM \`roles\` WHERE \`guild\` = ${g_id} AND \`role\` = ${r_id}`, (err, res) => {
    if (err)
      throw err;

    if (res[0].count === 0)
      con.query(`INSERT INTO \`roles\` (\`role\`, \`guild\`) VALUES (${r_id}, ${g_id})`);
  });
}
