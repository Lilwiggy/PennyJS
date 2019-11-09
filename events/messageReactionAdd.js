exports.run = (client, reaction, user, dis, conn) => {
  // Starboard pls?
  let guild = reaction.message.guild;
  let msg = reaction.message;
  let embed = {
    title: msg.author.username,
    thumbnail: {
      url: msg.author.displayAvatarURL,
    },
    color: 9043849,
  };
  const urlReg = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
  if (reaction.emoji.name !== '⭐' || msg.channel.nsfw || user.bot)
    return;

  client.checkServer(guild.id, guild.name, guild.iconURL, () => {
    if (msg.author.id === client.user.id && msg.embeds.length > 0) {
      if (msg.embeds[0].image) {
        embed.image = {
          url: msg.embeds[0].image.url,
        };
      }
      if (msg.embeds[0].description)
        embed.description = msg.embeds[0].description;
      if (msg.embeds[0].title)
        embed.title = msg.embeds[0].title;
      if (msg.embeds[0].thumbnail) {
        embed.thumbnail = {
          url: msg.embeds[0].thumbnail.url,
        };
      }
    } else {
      if (urlReg.test(msg.content)) {
        embed.image = {
          url: msg.content.match(urlReg)[0],
        };
      }
      if (msg.attachments.size > 0) {
        embed.image = {
          url: msg.attachments.first().url,
        };
      }
      if (msg.content.length > 0)
        embed.description = msg.content;
    }
    try {
      client.starQueue.push(doStuff(msg, guild, user, embed, conn));
    } catch (error) {
      console.log('Oops');
      console.log(error);
    }
  });
};

function doStuff(msg, guild, user, embed, conn) {
  return async() => {
    console.log('Running the function');
    let stuff = await getData(conn, msg);
    let c = stuff.ch;
    let res = stuff.results;
    if (c[0].count === 1) {
              // Message in starboard chat
              let m = await guild.channels.get(res[0].starboard)
              .fetchMessage(c[0].starID);
            // Original message
            let ms = await guild.channels.get(m.mentions.channels.first().id).fetchMessage(c[0].msgID);

            if (user.id === ms.author.id) {
              ms.reactions.forEach((re) => {
                re.remove(user.id);
              });
              m.reactions.forEach((re) => {
                re.remove(user.id);
              });
              return;
            }
      if (msg.content.startsWith('⭐') && msg.id === c[0].starID) {
        // Ignores if someone has already reacted to it
        if (ms.reactions.some((r) => r.users.has(user.id)))
          return;

        embed.title = ms.author.username;
        embed.thumbnail = {
          url: ms.author.displayAvatarURL,
        };
      }
      let g = (m.reactions.filter((r) => r.emoji.name === '⭐').size > 0) ? m.reactions.find((r) => r.emoji.name === '⭐').users.size : 0;
      m.edit(`⭐ ${ms.reactions.find((r) => r.emoji.name === '⭐').users.size + g} stars in ${m.mentions.channels.first()}`, {
        embed: embed,
      });
    } else if (res[0].starboard) {
      msg.reactions.forEach((re) => {
        if (re.emoji.name !== '⭐')
          return;
          // Sets the star requirement
        if (re.users.filter((u) => u.id !== msg.author.id).size >= 3) {
          console.log('Posting to starboard.');
          embed[0].fields = [
            {
              name: 'Jump to this message',
              value: `[Jump!](https://discordapp.com/channels/${guild.id}/${msg.channel.id}/${msg.id})`
            }
          ];
          guild.channels.get(res[0].starboard).send(`⭐ ${re.users.filter((u) => u.id !== msg.author.id).size} stars in ${msg.channel}`, {
            embed: embed,
          }).then((m) => {
            console.log('Adding to database');
            conn.query(`INSERT INTO \`starboard\` (msgID, starID) VALUES (${msg.id}, ${m.id})`);
          });
        }
      });
    }
  };
}

function getData(conn, msg) {
  return new Promise((resolve) => {
    let data = {};
    conn.query(`SELECT COUNT(*) AS \`count\`, \`msgID\`, \`starID\` FROM \`starboard\` WHERE \`msgID\` = ${msg.id} OR \`starID\` = ${msg.id}`, (err, ch) => {
      if (err)
        console.log(err);
      conn.query(`SELECT \`starboard\` FROM \`Servers\` WHERE \`ServerID\` = ${msg.guild.id}`, (e, results) => {
        if (e)
          console.log(e);
        data.ch = ch;
        data.results = results;
        resolve(data);
      });
    });
  });
}
