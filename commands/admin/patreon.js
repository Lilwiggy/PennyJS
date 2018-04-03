exports.run = (client, message, args, Discord, connection) => {
// Witty comment here
  if (message.mentions.users.first()) {
    connection.query(`UPDATE \`User\` SET \`patron\` = 1 WHERE \`User_ID\` = ${message.mentions.users.first().id}`);
    message.channel.send(`${message.mentions.users.first().username} is now a patron.`);
  } else {
    message.channel.send('Who am I adding as a patreon?');
  }
};


exports.conf = {
  name: 'patreon',
  description: '',
  usage: '',
  aliases: [],
};
