/* eslint-disable linebreak-style */
exports.run = (client, message, args, Discord, connection) => {
// Don't eff up fam
  if (args.length === 1) {
    message.channel.send('Who would you like to blacklist?');
  } else {
    connection.query(`SELECT * FROM \`User\` WHERE \`User_ID\` = ${connection.escape(args[1])}`, (err, res) => {
      if (err) {
        throw err;
      }
      if (res[0].Blacklisted === 1) {
        connection.query(`UPDATE \`User\` SET \`Blacklisted\` = 0 WHERE \`User_ID\` = ${connection.escape(args[1])}`);
        message.channel.send(`${client.users.cache.get(args[1]).username} has been unblacklisted.`);
      } else {
        connection.query(`UPDATE \`User\` SET \`Blacklisted\` = 1 WHERE \`User_ID\` = ${connection.escape(args[1])}`);
        message.channel.send(`${client.users.cache.get(args[1]).username} has been blacklisted.`);
      }
    });
  }
};


exports.conf = {
  name: 'blacklist',
  description: '',
  usage: '',
  aliases: [],
};
