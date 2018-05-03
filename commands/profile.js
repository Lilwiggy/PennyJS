exports.run = (client, message, args, Discord, connection) => {
  // Hey look you made it from the profile module, how do you do?
  // Well anyways this is the actual profile command. Made to be easier so that it's less messy.
  const pro = require('../modules/profile.js');
  // Gonna need the module fam ^^


  // Anti spam bit
  let userID = message.author.id;
  let command = 'profile';
  connection.query(`SELECT COUNT(*) as \`count\`, \`User_ID\` FROM \`usercool\` WHERE \`User_ID\` = ${userID}`, (err, res) => {
    if (err)
      throw err;
    if (res[0].count === 0) {
      connection.query(`INSERT INTO \`usercool\`(\`User_ID\`, \`command\`, \`cool\`) VALUES (${userID}, 'profile' , NOW())`);
      if (message.mentions.users.first()) {
        if (message.mentions.users.first().bot) {
          // No robot uprising today!
          message.channel.send("Haha. Silly you. Bots don't have profiles!");
        } else {
          // Good naming system, idiot
          pro.pro(client, message.mentions.users.first().id, message.mentions.users.first().username, message.mentions.users.first().displayAvatarURL, message, connection, Discord);
        }
      } else {
        // I'm a pro at naming systems.
        pro.pro(client, message.author.id, message.author.username, message.author.displayAvatarURL, message, connection, Discord);
      }
    } else {
      connection.query(`SELECT *,NOW()-INTERVAL 1 MINUTE > \`cool\` AS cooldown,(TO_SECONDS(\`cool\`)-TO_SECONDS(NOW() - INTERVAL 1 MINUTE)) AS restTime, NOW()  FROM \`usercool\` WHERE \`User_ID\`='${userID}' AND \`command\` = '${command}'`, (err1, res1, fields1) => {
        if (res1[0].cooldown === 0) {
          connection.query(`UPDATE \`usercool\` SET \`cool\` =NOW() WHERE \`command\` = '${command}' AND \`User_ID\` = '${userID}'`);
          if (message.mentions.users.first()) {
            if (message.mentions.users.first().bot) {
              // Still preventing the robot uprising here^^
              message.channel.send("Haha. Silly you. Bots don't have profiles!");
            } else {
              pro.pro(client, message.mentions.users.first().id, message.mentions.users.first().username, message.mentions.users.first().displayAvatarURL, message, connection, Discord);
            }
          } else {
            pro.pro(client, message.author.id, message.author.username, message.author.displayAvatarURL, message, connection, Discord);
          }
        } else {
          connection.query(`UPDATE \`usercool\` SET \`cool\` =NOW() WHERE \`command\` = '${command}' AND \`User_ID\` = '${userID}'`);
          if (message.mentions.users.first()) {
            if (message.mentions.users.first().bot) {
              // Still preventing the robot uprising here^^
              message.channel.send("Haha. Silly you. Bots don't have profiles!");
            } else {
              pro.pro(client, message.mentions.users.first().id, message.mentions.users.first().username, message.mentions.users.first().displayAvatarURL, message, connection, Discord);
            }
          } else {
            pro.pro(client, message.author.id, message.author.username, message.author.displayAvatarURL, message, connection, Discord);
          }
        }
      });
    }
  });
};

exports.conf = {
  name: 'profile',
  description: 'The profiles n stuff',
  usage: 'profile',
  aliases: [],
};
