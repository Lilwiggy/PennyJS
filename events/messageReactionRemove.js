exports.run = (client, reaction, user, dis, conn) => {
  // Shit star
  let guild = reaction.message.guild;
  let msg = reaction.message;
  const urlReg = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
  if (reaction.emoji.name !== '⭐')
    return;
  if (user.bot)
    return;


  client.checkServer(guild.id, guild.name, guild.iconURL, () => {
    let embed = {
      author: {
        name: msg.author.username,
        icon_url: msg.author.displayAvatarURL,
      },
      color: 9043849,
    };
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

    conn.query(`SELECT COUNT(*) AS \`count\`, \`msgID\`, \`starID\` FROM \`starboard\` WHERE \`starID\` = ${msg.id} OR \`msgID\` = ${msg.id}`, (err, c) => {
      if (err)
        console.log(err);

      conn.query(`SELECT COUNT(*) AS \`count\`, \`starboard\` FROM \`Servers\` WHERE \`ServerID\` = ${guild.id}`, (e, res) => {
        if (c[0].count === 0)
          return;

        doStuff(client, guild, res, c, user, embed).catch(() => { console.log(`Oopsie woopsies I did a fucky uppie （ノд｀＠）`); });
      });
    });
  });
};

async function doStuff(client, guild, res, c, user, embed) {
  let m = await guild.channels.get(res[0].starboard).fetchMessage(c[0].starID);
  let stars = m.content.split('stars');
  if (m.author.id === client.user.id) {
    guild.channels.get(m.mentions.channels.first().id).fetchMessage(c[0].msgID).then((ms) => {
      ms.reactions.some((r) => {
        if (r.users.has(user.id))
          return;
        embed.author.name = ms.author.username;
        embed.author.icon_url = ms.author.displayAvatarURL;
        embed.description = ms.content;
        if (ms.reactions.size < 3) {
          m.delete()
            .catch(() => { console.log(`Error deleting 1`); });
        } else {
          m.edit(`⭐ ${parseInt(stars[0].slice(1)) - 1} stars in ${m.mentions.channels.first()}`, {
            embed: embed,
          })
            .catch(() => { console.log(`Error editing 2`); });
        }
      });
    })
      .catch(() => {
        m.delete()
          .catch(() => { console.log(`Error deleting 2`); });
      });
  } else {
    guild.channels.get(res[0].starboard).fetchMessage(c[0].starID).then((msSt) => {
      msSt.edit(`⭐ ${parseInt(stars[0].slice(1)) - 1} stars in ${msSt.mentions.channels.first()}`, {
        embed: embed,
      })
        .catch(() => { console.log(`Error editing 1`); });
    });
  }
}
