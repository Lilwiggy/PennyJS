exports.run = (client, message, args, Discord, connection) => {
  // Nightly. 😤
  client.checkUser(message.author.id, message.author.avatarURL, () => {
    connection.query(`SELECT *,NOW()-INTERVAL 24 HOUR > \`DailyTime\` AS canGetDaily,(TO_SECONDS(\`DailyTime\`)-TO_SECONDS(NOW() - INTERVAL 24 HOUR)) AS restTime, NOW()  FROM \`User\` WHERE \`User_ID\`='${message.author.id}'`, (error, results, fields) => {
      if (results[0].canGetDaily === 1) {
        connection.query(`UPDATE \`User\` SET \`DailyTime\`=NOW(),\`Credits\`=\`Credits\`+500 WHERE \`User_ID\` = '${message.author.id}'`);
        message.channel.send("💸 Here's your 500 credits 💸");
      } else {
        let date = new Date(null);
        date.setSeconds(results[0].restTime);
        let hours = date.toISOString().substr(11, 2);
        let minutes = date.toISOString().substr(14, 2);
        let seconds = date.toISOString().substr(17, 2);

        message.channel.send(`Your daily will reset in, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`);
      }
    });
  });
};

exports.conf = {
  name: 'daily',
  description: 'Get your daily 500 credits.',
  usage: 'daily',
  aliases: ['dailies'],
};
