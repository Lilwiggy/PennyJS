exports.run = (client, reaction, user, dis, conn) => {
  // Starboard pls?
  let guild = reaction.message.guild;
  let msg = reaction.message;
  let embed = {
    author: {
      name: msg.author.username,
      icon_url: msg.author.displayAvatarURL,
    },
    color: 9043849,
  };
  const urlReg = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
  if (reaction.emoji.name !== '⭐')
    return;
  if (msg.channel.nsfw)
    return;
  if (user.bot)
    return;


  client.checkServer(guild.id, guild.name, guild.iconURL, () => {
    if (msg.embeds.length > 0) {
      if (msg.content && urlReg.test(msg.content))
        embed.description = msg.content;
      if (msg.embeds[0].image) {
        embed.image = {
          url: msg.embeds[0].image.url,
        };
      }
      if (msg.embeds[0].description)
        embed.description = msg.embeds[0].description;
      if (msg.embeds[0].author) {
        embed.author = {
          name: msg.embeds[0].author.name,
          icon_url: msg.embeds[0].author.iconURL,
        };
      }
    } else {
      if (msg.attachments.size > 0) {
        embed.image = {
          url: msg.attachments.first().url,
        };
      }
      if (msg.content.length > 0)
        embed.description = msg.content;
    }
    conn.query(`SELECT COUNT(*) AS \`count\`, \`msgID\`, \`starID\` FROM \`starboard\` WHERE \`msgID\` = ${msg.id} OR \`starID\` = ${msg.id}`, (err, c) => {
      if (err)
        console.log(err);

      conn.query(`SELECT \`starboard\` FROM \`Servers\` WHERE \`ServerID\` = ${guild.id}`, (e, res) => {
        if (e)
          console.log(e);

        doStuff(msg, c, res, guild, user, embed, reaction, conn).catch(() => { console.log(`Oopsie woopsies I did a fucky uppie （ノд｀＠）`); });
      });
    });
  });
};

async function doStuff(msg, c, res, guild, user, embed, reaction, conn) {
  if (c[0].count === 1) {
    if (msg.content.startsWith('⭐')) {
      if (msg.id === c[0].starID) {
        let m = await guild.channels.get(res[0].starboard)
          .fetchMessage(c[0].starID);
        let ms = await guild.channels.get(m.mentions.channels.first().id).fetchMessage(c[0].msgID);
        if (ms.reactions.some((r) => r.users.has(user.id)))
          return;
        let stars = m.content.split('stars');
        m.edit(`⭐ ${ms.reactions.filter((re) => re.emoji.name === '⭐').size + parseInt(stars[0].slice(1))} stars in ${m.mentions.channels.first()}`, {
          embed: embed,
        });
      }
    } else {
      let m = await guild.channels.get(res[0].starboard)
        .fetchMessage(c[0].starID);
      let ms = await guild.channels.get(m.mentions.channels.first().id).fetchMessage(c[0].msgID);
      let stars = m.content.split('stars');
      m.edit(`⭐ ${ms.reactions.filter((re) => re.emoji.name === '⭐').size + parseInt(stars[0].slice(1))} stars in ${m.mentions.channels.first()}`, {
        embed: embed,
      });
    }
  } else if (res[0].starboard) {
    if (msg.reactions.some((r) => r.users.filter((u) => u.id !== msg.author.id).size) >= 3) {
      guild.channels.get(res[0].starboard).send(`⭐ ${msg.reactions.filter((re) => re.emoji.name === '⭐').size} stars in ${msg.channel}`, {
        embed: embed,
      }).then((m) => {
        conn.query(`INSERT INTO \`starboard\` (msgID, starID) VALUES (${msg.id}, ${m.id})`);
      });
    }
  }
}
