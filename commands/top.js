exports.run = (client, message, args, Discord, connection) => {
  // Leaderboard
  connection.query(`SELECT * FROM \`User\` ORDER BY \`Level\` DESC LIMIT 10`, (err, res) => {
    if (err)
      throw err;
    const embed = new Discord.RichEmbed()
      .setTitle(`Top 10 users with the highest levels.`)
      .setColor(`#89ff89`);
    for (let i = 0; i < res.length; i++)
      embed.addField(`${getUser(client, res[i].User_ID)}`, `Level: ${res[i].Level}`);
    message.channel.send(embed);
  });
};

function getUser(client, id) {
  if (!client.users.get(id))
    return `User not found. ID: ${id}`;
  else
    return client.users.get(id).username;
}

exports.conf = {
  name: 'top',
  description: 'Top levels',
  usage: 'top',
  aliases: ['leaderboard'],
};
