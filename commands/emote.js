exports.run = (client, message, args, Discord, connection) => {
// Witty comment here
  if (args.length === 1) {
    message.channel.send(`Usage: ${client.prefix}emote [emote]`);
  } else {
    let em = /<a?:\w+:\d+>/g;
    if (em.test(args[1])) {
      let em_id = /[0-9]/g;
      let r = message.content.match(em_id).join('');
      if (r.length > 18) {
        if (message.guild.emojis.get(r.substr(0, 18))) {
          connection.query(`SELECT * FROM \`emote\` WHERE \`server_id\` = ${message.guild.id} AND \`emote_id\` = ${r.substr(0, 18)}`, (err, res) => {
            if (err)
              throw err;
            if (!res[0])
              message.channel.send(`That emote has not been used.`);
            else
              message.channel.send(`That emote has been used ${res[0].used} times.`);
          });
        } else {
          message.channel.send(`That emote is not on this server.`);
        }
      } else if (message.guild.emojis.get(r)) {
        connection.query(`SELECT * FROM \`emote\` WHERE \`server_id\` = ${message.guild.id} AND \`emote_id\` = ${r}`, (err, res) => {
          if (err)
            throw err;
          if (!res[0])
            message.channel.send(`That emote has not been used.`);
          else
            message.channel.send(`That emote has been used ${res[0].used} times.`);
        });
      } else {
        message.channel.send(`That emote is not on this server.`);
      }
    } else {
      message.channel.send(`Please use a custom emote.`);
    }
  }
};


exports.conf = {
  name: 'emote',
  description: 'Stats for emotes.',
  usage: 'emote [emote]',
  aliases: [],
};
