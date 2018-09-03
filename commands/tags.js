exports.run = (client, message, args, Discord, connection) => {
// Witty comment here
  let tags = [];
  let user = message.mentions.users.first() || message.author;
  connection.query(`SELECT * FROM \`tags\` WHERE \`owner\` = ${user.id} AND \`guild\` = ${message.guild.id}`, (e, res) => {
    if (res.length > 0) {
      res.forEach((d) => {
        tags.push(d.name);
      });
    }
    if (tags.length > 0) {
      message.channel.send({ embed: {
        title: `Tags for ${user.username} (total tags: ${tags.length})`,
        color: 9043849,
        description: tags.join(`, `),
      } });
    } else {
      message.channel.send(`${user.username} does not own any tags.`);
    }
  });
};


exports.conf = {
  name: 'tags',
  description: 'View your own tags or someone else\'s tags.',
  usage: 'tags {optional: [@user]}',
  aliases: [],
};
