exports.run = (client, message, args, Discord, connection) => {
  // Needs more hugs

  let wiggyID = '232614905533038593';

  let images = require(`./images.json`);
  let lols = images.hugs.lolno;
  let hugsAnime = images.hugs.anime;
  let hugsReal = images.hugs.noAnime;

  let ppl = ['239110748180054017', '143109424045621250', '378384603859255317', '183668135474233345'];
  if (message.mentions.users.first()) {
    if (message.mentions.users.first().id === wiggyID && !ppl.includes(message.author.id)) {
      let hug = lols[Math.floor(Math.random() * lols.length)];
      message.channel.send(`${message.author} just tried to hug Lilwiggy. Yeah that didn't work.`, { file: hug });
    } else if (message.mentions.users.first().id === message.author.id) {
      message.channel.send("You can't hug yourself! That's just a bit weird.");
    } else if (message.mentions.users.first().bot) {
      message.channel.send("Silly you! Bots don't have emotions!");
    } else {
      client.checkUser(message.mentions.users.first().id, message.mentions.users.first().displayAvatarURL, () => {
        connection.query(`SELECT \`weeb\` FROM \`User\` WHERE \`User_ID\` = ${message.mentions.users.first().id}`, (err, res) => {
          if (err)
            throw err;
          if (res[0].weeb === 'on') {
            let hug = hugsAnime[Math.floor(Math.random() * hugsAnime.length)];
            message.channel.send(`${message.author} just gave ${message.mentions.users.first()} a hug!`, {
              file: hug,
            });
          } else {
            let hug = hugsReal[Math.floor(Math.random() * hugsReal.length)];
            message.channel.send(`${message.author} just gave ${message.mentions.users.first()} a hug!`, {
              file: hug,
            });
          }
        });
      });
    }
  } else {
    message.channel.send('Please mention a valid user.');
  }
};


exports.conf = {
  name: 'hug',
  description: 'Give someone a hug!',
  usage: 'hug [@user]',
  aliases: ['fuck'],
};
