exports.run = function(client, message, args, Discord, connection) {
// Background thingies! (needs more)
  const data = require('../modules/shop.json');
  if (args.length === 1) {
    message.channel.send(`Usage: ${client.prefix}setbackground [background]\nBackground options are here: https://pennybot.tk/backgrounds or by doing ${client.prefix}shopinfo backgrounds`);
  } else if (data[args[1]] && data[args[1]].type === 'background') {
    if (args[1] === 'patreon') {
      connection.query(`SELECT * FROM \`User\` WHERE \`User_ID\` = ${message.author.id}`, (err, res, fields) => {
        if (res[0].patron === 1)
          client.setBackground(message.author.id, message.author.avatarURL, 'patreon', 0, message);
        else
          message.channel.send('This background is for Patreons only.');
      });
    } else {
      client.setBackground(message.author.id, message.author.avatarURL, data[args[1]].name, data[args[1]].price, message);
    }
  } else {
    message.channel.send('Background options can be found here: https://pennybot.tk/backgrounds or by doing //shopinfo backgrounds');
  }
};

exports.conf = {
  name: 'setbackground',
  description: 'Set this to be kids with the hip',
  usage: 'setbackground',
  aliases: [],
};
