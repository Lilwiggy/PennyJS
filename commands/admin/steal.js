/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
exports.run = (client, message, args) => {
// Your emojis are mine now
  if (!args[1]) {
    message.channel.send(`Hey, dumbass, you forgot the message ID.`);
    return;
  }
  message.channel.messages.fetch(args[1]).then((m) => {
    const em = /<a?:\w+:\d+>/g;
    if (!em.test(m.content)) {
      message.channel.send(`I couldn't find any emojis. Did you copy the wrong ID, moron?`);
      return;
    }
    const em_name = /(?!a:)\w+(?=:)/gi;
    const em_id = /\d{18}/g;
    const animated = /(?!<)[a](?=:)/g;
    const r = m.content.match(em_name);
    const emojis = m.content.match(em);
    if (r === null) {
      message.channel.send(`So uh, couldn't find any names. May wanna fix that.`);
      return;
    }

    if (r.length > 1) {
      let s = '';
      emojis.forEach((e, i) => {
        s += `(${i + 1}) ${e}\n`;
      });
      message.channel.send(`I found ${r.length} emojis. Which one do you want?\n${s}`).then((mc) => {
        const filter = (ms) => ms.author.id === message.author.id;
        const col = mc.channel.createMessageCollector(filter, {time: 60000});
        col.on(`collect`, (ms) => {
          ms = ms.content.toLowerCase();

          if (ms === 'all') {
            emojis.forEach((e, i) => {
              const id = e.match(em_id).join('');
              let type = '';
              if (e.match(animated) === null) {
                type = 'png';
              } else {
                type = 'gif';
              }
              client.guilds.cache.get(`309531752014151690`).emojis.create(`https://cdn.discordapp.com/emojis/${id}.${type}`, r[i]);
            });
            message.channel.send(`Created ${emojis.length} emojis.`);
          } else if (ms === 'none') {
            message.channel.send(`Wow you wanted none of them? You wasted my time. Goodbye, cunt.`);
          } else {
            const e = emojis[parseInt(ms) - 1];
            const id = e.match(em_id).join('');
            let type = '';
            if (e.match(animated) === null) {
              type = 'png';
            } else {
              type = 'gif';
            }
            client.guilds.cache.get(`309531752014151690`).emojis.create(`https://cdn.discordapp.com/emojis/${id}.${type}`, r[parseInt(ms) - 1]);
            message.channel.send(`I added ${r[parseInt(ms) - 1]} as an emoji. Now leave me alone. Jesus.`);
          }
          col.stop();
        });
      });
    } else {
      const id = emojis[0].match(em_id).join('');
      let type = '';
      if (emojis[0].match(animated) === null) {
        type = 'png';
      } else {
        type = 'gif';
      }
      client.guilds.cache.get(`309531752014151690`).emojis.create(`https://cdn.discordapp.com/emojis/${id}.${type}`, r[0]);
      message.channel.send(`I added ${r[0]} as an emoji. Now leave me alone. Jesus. Asshole.`);
    }
  });
};


exports.conf = {
  name: 'steal',
  description: 'Steals emojis dead',
  usage: 'steal [emoji]',
  aliases: [],
};
