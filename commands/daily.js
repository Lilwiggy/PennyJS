exports.run = (client, message, args, Discord, connection) => {
  // Nightly. 😤
  const moment = require(`moment`);
  client.checkUser(message.author.id, message.author.displayAvatarURL, () => {
    connection.query(`SELECT \`DailyTime\` FROM \`User\` WHERE \`User_ID\`='${message.author.id}'`, (error, results) => {
      if (results[0].DailyTime === 1) {
        if (message.mentions.users.first()) {
          if (message.mentions.users.first().id === message.author.id) {
            message.channel.send(`You can't give yourself daily credits!\nJust do ${client.prefix}daily instead.`);
          } else if (message.mentions.users.first().bot) {
            message.channel.send(`Bots have no use for money.`);
          } else {
            client.checkUser(message.mentions.users.first().id, message.mentions.users.first().displayAvatarURL, () => {
              let amount = Math.floor(Math.random() * (2000 - 1000)) + 500;
              connection.query(`UPDATE \`User\` SET \`Credits\`=\`Credits\` + ${amount} WHERE \`User_ID\` = '${message.mentions.users.first().id}'`);
              connection.query(`UPDATE \`User\` SET \`DailyTime\` = 0 WHERE \`User_ID\` = '${message.author.id}'`);
              message.channel.send(`💸 ${message.author.username} just gave ${message.mentions.users.first().username} ${amount} daily credits! 💸`);
            });
          }
        } else {
          let amount = Math.floor(Math.random() * (1000 - 500)) + 500;
          connection.query(`UPDATE \`User\` SET \`DailyTime\` = 0,\`Credits\`=\`Credits\` + ${amount} WHERE \`User_ID\` = '${message.author.id}'`);
          message.channel.send(`💸 Here's your ${amount} credits 💸`);
        }
      } else {
        let dur = moment.duration(client.job.nextInvocation() - Date.now());
        message.channel.send(`Your daily will reset in, ${dur.hours()} hours, ${dur.minutes()} minutes, and ${dur.seconds()} seconds.`);
      }
    });
  });
};

exports.conf = {
  name: 'daily',
  description: 'Get your daily credits. Or give them to someone else.',
  usage: 'daily {optional: [@user]}',
  aliases: ['dailies'],
};
