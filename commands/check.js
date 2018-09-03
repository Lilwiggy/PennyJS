exports.run = (client, message, args, Discord, conn) => {
// Witty comment here
  if (message.guild.id === '346800980102348810' && message.member.permissions.has('ADMINISTRATOR')) {
    if (!args[1]) {
      message.channel.send(`Please mention a user or specify a username or user ID.`);
    } else {
      let user = message.guild.members.find((m) => m.user.username.toLowerCase() === args[1].toLowerCase()) ||
    message.guild.members.get(args[1]) ||
    message.mentions.members.first();
      if (user) {
        conn.query(`SELECT COUNT(*) AS \`count\`, \`warns\` FROM \`warns\` WHERE \`ID\` = ${user.id}`, (e, res) => {
          if (res[0].count < 1) {
            message.channel.send(`That user does not have any warnings.`);
          } else {
            message.channel.send({ embed: {
              title: `Warnings for ${user.user.username}`,
              description: `${user} has ${res[0].warns} warnings`,
              thumbnail: {
                url: user.user.displayAvatarURL,
              },
            } });
          }
        });
      } else {
        message.channel.send(`Please mention a user or specify a username or user ID.`);
      }
    }
  }
};


exports.conf = {
  name: 'check',
  description: '',
  usage: '',
  aliases: [],
  hidden: true,
};
