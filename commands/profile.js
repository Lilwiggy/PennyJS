exports.run = (client, message, args, Discord, connection) => {
  // Hey look you made it from the profile module, how do you do?
  // Well anyways this is the actual profile command. Made to be easier so that it's less messy.
  // Also made a little less messy by Uninvited.

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
      let user = message.mentions.users.first() || message.member
        if (user.bot) {
          // No robot uprising today!
          message.channel.send("Haha. Silly you. Bots don't have profiles!");
        } else {
          // Good naming system, idiot.
          pro.pro(client, user.id, user.displayName, user.displayAvatarURL, message, connection, Discord);
        }
    } else {
      connection.query(`SELECT *,NOW()-INTERVAL 1 MINUTE > \`cool\` AS cooldown,(TO_SECONDS(\`cool\`)-TO_SECONDS(NOW() - INTERVAL 1 MINUTE)) AS restTime, NOW()  FROM \`usercool\` WHERE \`User_ID\`='${userID}' AND \`command\` = '${command}'`, (err1, res1, fields1) => {
        if (res1[0].cooldown === 0) {
          connection.query(`UPDATE \`usercool\` SET \`cool\` =NOW() WHERE \`command\` = '${command}' AND \`User_ID\` = '${userID}'`);
           let user = message.mentions.users.first() || message.member
            if (user.bot) {
              // Still preventing the robot uprising here^^
              message.channel.send("Haha. Silly you. Bots don't have profiles!");
            } else {
              pro.pro(client, user.id, user.displayName, user.displayAvatarURL, message, connection, Discord);
            }
        } else {
          connection.query(`UPDATE \`usercool\` SET \`cool\` =NOW() WHERE \`command\` = '${command}' AND \`User_ID\` = '${userID}'`);
           let user = message.mentions.users.first() || message.member
            if (user.bot) {
              // Still preventing the robot uprising here^^
              message.channel.send("Haha. Silly you. Bots don't have profiles!");
            } else {
              pro.pro(client, user.id, user.displayName, user.displayAvatarURL, message, connection, Discord);
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
