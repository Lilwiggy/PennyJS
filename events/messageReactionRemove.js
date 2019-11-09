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
      title: msg.author.username,
      thumbnail: {
        url: msg.author.displayAvatarURL,
      },
      color: 9043849,
    };
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

    conn.query(`SELECT COUNT(*) AS \`count\`, \`msgID\`, \`starID\` FROM \`starboard\` WHERE \`starID\` = ${msg.id} OR \`msgID\` = ${msg.id}`, (err, c) => {
      if (err)
        console.log(err);

      conn.query(`SELECT COUNT(*) AS \`count\`, \`starboard\` FROM \`Servers\` WHERE \`ServerID\` = ${guild.id}`, (e, res) => {
        if (c[0].count === 0)
          return;

        try {
          client.starQueue.push(doStuff(client, guild, res, c, user, embed));
        } catch (error) {
          console.log('Oops');
          console.log(error);
        }
      });
    });
  });
};

function doStuff(client, guild, res, c, user, embed) {
  return async() => {
    // Starboard message
    let m = await guild.channels.get(res[0].starboard).fetchMessage(c[0].starID);
    // Original message
    let ms = await guild.channels.get(m.mentions.channels.first().id).fetchMessage(c[0].msgID);
    if (user.id === ms.author.id)
      return;
      
    if (m.author.id === client.user.id) {
        ms.reactions.some((r) => {
          if (r.users.has(user.id))
            return;
          embed.title = ms.author.username;
          embed.thumbnail = {
            url: ms.author.displayAvatarURL,
          };
          embed.fields = [
            {
              name: 'Jump to this message',
              value: `[Jump!](https://discordapp.com/channels/${guild.id}/${ms.channel.id}/${ms.id})`
            }
          ];
        });
    }
    let original = ms.reactions.find((r) => r.emoji.name === '⭐').users.size;
    let starboard = (m.reactions.filter((r) => r.emoji.name === '⭐').size > 0) ? m.reactions.find((r) => r.emoji.name === '⭐').users.size : 0;
    if (original + starboard < 2) {
      m.delete()
        .catch(() => { console.log('Error deleting 1'); });
    } else {
      m.edit(`⭐ ${original + starboard} stars in ${m.mentions.channels.first()}`, {
        embed: embed,
      })
        .catch(() => { console.log('Error editing 2'); });
    }
  };
}
