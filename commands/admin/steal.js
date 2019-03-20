exports.run = (client, message, args) => {
// Your emojis are mine now
  if (!args[1]) {
    message.channel.send(`Hey, dumbass, you forgot the message ID.`);
    return;
  }
  message.channel.fetchMessage(args[1]).then((m) => {
    let em = /<a?:\w+:\d+>/g;
    if (!em.test(m.content)) {
      message.channel.send(`I couldn't find any emojis. Did you copy the wrong ID, moron?`);
      return;
    }
    let em_name = /(?!a:)\w+(?=:)/gi;
    let em_id = /\d{18}/g;
    let animated = /(?!<)[a](?=:)/g;
    let r = m.content.match(em_name);
    let emojis = m.content.match(em);
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
        let filter = (ms) => ms.author.id === message.author.id;
        let col = mc.channel.createMessageCollector(filter, { time: 60000 });
        col.on(`collect`, (ms) => {
          ms = ms.content.toLowerCase();

          if (ms === 'all') {
            emojis.forEach((e, i) => {
              let id = e.match(em_id).join('');
              let type = '';
              if (e.match(animated) === null)
                type = 'png';
              else
                type = 'gif';
              client.guilds.get(`309531752014151690`).createEmoji(`https://cdn.discordapp.com/emojis/${id}.${type}`, r[i]);
            });
            message.channel.send(`Created ${emojis.length} emojis.`);
          } else if (ms === 'none') {
            message.channel.send(`Wow you wanted none of them? You wasted my time. Goodbye cunt.`);
          } else {
            let e = emojis[parseInt(ms) - 1];
            let id = e.match(em_id).join('');
            let type = '';
            if (e.match(animated) === null)
              type = 'png';
            else
              type = 'gif';
            client.guilds.get(`309531752014151690`).createEmoji(`https://cdn.discordapp.com/emojis/${id}.${type}`, r[parseInt(ms) - 1]);
            message.channel.send(`I added ${r[parseInt(ms) - 1]} as an emoji. Now leave me alone.`);
          }
          col.stop();
        });
      });
    } else {
      let id = emojis[0].match(em_id).join('');
      let type = '';
      if (emojis[0].match(animated) === null)
        type = 'png';
      else
        type = 'gif';
      client.guilds.get(`309531752014151690`).createEmoji(`https://cdn.discordapp.com/emojis/${id}.${type}`, r[0]);
      message.channel.send(`I added ${r[0]} as an emoji. Now leave me alone.`);
    }
  });
};


exports.conf = {
  name: 'steal',
  description: 'Steals emojis dead',
  usage: 'steal [emoji]',
  aliases: [],
};
