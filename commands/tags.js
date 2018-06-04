exports.run = (client, message, args, Discord, connection) => {
// Witty comment here
  let tags = [];
  connection.query(`SELECT * FROM \`tags\` WHERE \`owner\` = ${message.author.id} AND \`guild\` = ${message.guild.id}`, (e, res) => {
    if (res.length > 0) {
      res.forEach((d) => {
        tags.push(d.name);
      });
    }
    if (tags.length > 0) {
      message.channel.send({ embed: {
        title: `Tags for ${message.author.username}`,
        color: 9043849,
        fields: [
          {
            name: `Tags total: ${tags.length}`,
            value: tags.join(`\n`),
          },
        ],
      } });
    } else {
      message.channel.send(`You don't have any tags!`);
    }
  });
};


exports.conf = {
  name: 'tags',
  description: 'View the tags you own',
  usage: 'tags',
  aliases: [],
};
