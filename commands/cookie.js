exports.run = (client, message, args, Discord, connection) => {
  // COOKIEESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
  let gifs = [
    'http://i.imgur.com/59BsuwU.gif',
    'https://media.giphy.com/media/nAErqE3k2C3fy/giphy.gif',
    'https://i0.wp.com/media2.giphy.com/media/3YsEPo1u3C8dW/giphy.gif',
    'http://media.giphy.com/media/12D9NI9XRXXHEI/giphy.gif',
    'https://media1.tenor.com/images/51a659cee3d3d2b1d59014d967aafdc1/tenor.gif',
    'https://media1.tenor.com/images/079965b12ca69dedac627f6806a9a189/tenor.gif',
    'https://media1.tenor.com/images/99e562316f8e5b5fa996aee2cfb0d03b/tenor.gif',
  ];
  let gif = gifs[Math.floor(Math.random() * gifs.length)];
  client.checkUser(message.author.id, message.author.avatarURL, () => {
    if (args.length === 1) {
      connection.query(`SELECT *,NOW()-INTERVAL 24 HOUR > \`CT\` AS canGetDaily,(TO_SECONDS(\`CT\`)-TO_SECONDS(NOW() - INTERVAL 24 HOUR)) AS restTime, NOW()  FROM \`User\` WHERE \`User_ID\`=${message.author.id}`, (error, results, fields) => {
        if (results[0].canGetDaily === 0) {
          let date = new Date(null);
          date.setSeconds(results[0].restTime);
          let hours = date.toISOString().substr(11, 2);
          let minutes = date.toISOString().substr(14, 2);
          let seconds = date.toISOString().substr(17, 2);

          message.channel.send(`You can give someone a cookie in, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`);
        } else {
          message.channel.send('**You can give someone a cookie.**');
        }
      });
    } else if (message.mentions.users.first()) {
      if (message.mentions.users.first().id === message.author.id) {
        message.channel.send("You can't give yourself a cookie!");
      } else
      if (message.mentions.users.first().bot) {
        message.channel.send("You can't give bots cookies!");
      } else {
        client.checkUser(message.mentions.users.first().id, message.mentions.users.first().avatarURL, () => {
          connection.query(`SELECT *,NOW()-INTERVAL 24 HOUR > \`CT\` AS canGetDaily,(TO_SECONDS(\`CT\`)-TO_SECONDS(NOW() - INTERVAL 24 HOUR)) AS restTime, NOW()  FROM \`User\` WHERE \`User_ID\`= ${message.author.id}`, (error, results, fields) => {
            if (results[0].canGetDaily === 1) {
              connection.query(`UPDATE \`User\` SET \`CT\`=NOW() WHERE \`User_ID\` = ${message.author.id}`);
              connection.query(`UPDATE \`User\` SET \`Cookie\`=\`Cookie\`+1 WHERE \`User_ID\` = ${message.mentions.users.first().id}`);
              message.channel.send(`${message.author.username} just gave ${message.mentions.users.first().username} a cookie!`, {
                file: gif,
              });
            } else {
              let date = new Date(null);
              date.setSeconds(results[0].restTime);
              let hours = date.toISOString().substr(11, 2);
              let minutes = date.toISOString().substr(14, 2);
              let seconds = date.toISOString().substr(17, 2);

              message.channel.send(`You can give someone a cookie in, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`);
            }
          });
        });
      }
    } else {
      message.channel.send('Please mention a valid user.');
    }
  });
};

// I'm starting to get really tired so my comments suck rn tbh

exports.conf = {
  name: 'cookie',
  description: 'Give someone a cookie. Please.',
  usage: 'cookie',
  aliases: [],
};
