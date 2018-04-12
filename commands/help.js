exports.run = (client, message) => {
  const embeds = {
    fun: {
      title: 'Official server',
      author: {
        name: `Penny commands`,
        url: null,
        iconURL: client.user.displayAvatarURL,
        proxyIconURL: null,
      },
      color: 9043849,
      url: 'https://discord.gg/kwcd9dq',
      footer: {
        text: 'PennyBot © Lilwiggy 2018',
        iconURL: null,
        proxyIconURL: null,
      },
      fields: [{
        name: `${client.prefix}waifu`,
        value: `Wiggy is weird okay?`,
        inline: false,
      },
      {
        name: `${client.prefix}nsfw waifu`,
        value: `Only works in NSFW marked chats.`,
        inline: false,
      },
      {
        name: `${client.prefix}slap`,
        value: `Slaps the first user mentioned.`,
        inline: false,
      },
      {
        name: `${client.prefix}highfive`,
        value: `Highfives the first user mentioned.`,
        inline: false,
      },
      {
        name: `${client.prefix}gamble`,
        value: `Wanna gamble your money go ahead but don't come to me complaining when...`,
        inline: false,
      },
      {
        name: `${client.prefix}define`,
        value: `Searches Urban Dictionary for a word.`,
        inline: false,
      }],
    },
    page2: {

      title: 'Official server',
      author: {
        name: `Penny commands`,
        url: null,
        iconURL: client.user.displayAvatarURL,
        proxyIconURL: null,
      },
      color: 9043849,
      url: 'https://discord.gg/kwcd9dq',
      footer: {
        text: 'PennyBot © Lilwiggy 2018',
        iconURL: null,
        proxyIconURL: null,
      },
      fields: [{
        name: `${client.prefix}osu`,
        value: `Some OSU stats.`,
        inline: false,
      },
      {
        name: `${client.prefix}complain`,
        value: `Complain about Penny. We appreciate the feedback.`,
        inline: false,
      },
      {
        name: `${client.prefix}inspire`,
        value: `Be inspired by these amazing quotes.`,
        inline: false,
      },
      {
        name: `${client.prefix}random avatar`,
        value: `I like ~~stalking people~~ finding random avatars. You do too, now.`,
        inline: false,
      },
      {
        name: `${client.prefix}emote`,
        value: `How many times has an emote been used? Find out here.`,
        inline: false,
      }],
    },

    mod: {
      title: 'Official server',
      author: {
        name: `Penny commands`,
        url: null,
        iconURL: client.user.displayAvatarURL,
        proxyIconURL: null,
      },
      color: 9043849,
      url: 'https://discord.gg/kwcd9dq',
      footer: {
        text: 'PennyBot © Lilwiggy 2018',
        iconURL: null,
        proxyIconURL: null,
      },
      fields: [{
        name: `${client.prefix}kick`,
        value: `Kicks the first user mentioned.`,
        inline: false,
      },
      {
        name: `${client.prefix}ban`,
        value: `Bans the first user mentioned.`,
        inline: false,
      },
      {
        name: `${client.prefix}delete`,
        value: `Deletes X number of messages.`,
        inline: false,
      },
      {
        name: `${client.prefix}welcome`,
        value: `Enables/disables welcomes.`,
        inline: false,
      },
      {
        name: `${client.prefix}set welcome channel`,
        value: `Selects the channel to welcome new users in.`,
        inline: false,
      }],
    },
    anotherPage: {
      title: 'Official server',
      author: {
        name: `Penny commands`,
        url: null,
        iconURL: client.user.displayAvatarURL,
        proxyIconURL: null,
      },
      color: 9043849,
      url: 'https://discord.gg/kwcd9dq',
      footer: {
        text: 'PennyBot © Lilwiggy 2018',
        iconURL: null,
        proxyIconURL: null,
      },
      fields: [{
        name: `${client.prefix}set leave message`,
        value: `Sets a leaving message for when a user leaves.`,
        inline: false,
      },
      {
        name: `${client.prefix}set welcome message`,
        value: `Sets a welcome message for when a user joins.`,
        inline: false,
      },
      {
        name: `${client.prefix}set prefix`,
        value: `Sets a custom prefix.`,
        inline: false,
      },
      {
        name: `${client.prefix}enable levels`,
        value: `Enables levels.`,
        inline: false,
      },
      {
        name: `${client.prefix}disable levels`,
        value: `Disables levels.`,
        inline: false,
      }],
    },
    profile: {
      title: 'Official server',
      author: {
        name: `Penny commands`,
        url: null,
        iconURL: client.user.displayAvatarURL,
        proxyIconURL: null,
      },
      color: 9043849,
      url: 'https://discord.gg/kwcd9dq',
      footer: {
        text: 'PennyBot © Lilwiggy 2018',
        iconURL: null,
        proxyIconURL: null,
      },
      fields: [{
        name: `${client.prefix}profile`,
        value: `Shows the user's profile.`,
        inline: false,
      },
      {
        name: `${client.prefix}setbackground`,
        value: `Sets the user's backgrounds.`,
        inline: false,
      },
      {
        name: `${client.prefix}setemblem`,
        value: `Sets the user's emblem.`,
        inline: false,
      },
      {
        name: `${client.prefix}backgrounds`,
        value: `Links you to what backgrounds you own.`,
        inline: false,
      },
      {
        name: `${client.prefix}credits`,
        value: `Shows how many credits you own.`,
        inline: false,
      }],
    },
    social: {
      title: 'Official server',
      author: {
        name: `Penny commands`,
        url: null,
        iconURL: client.user.displayAvatarURL,
        proxyIconURL: null,
      },
      color: 9043849,
      url: 'https://discord.gg/kwcd9dq',
      footer: {
        text: 'PennyBot © Lilwiggy 2018',
        iconURL: null,
        proxyIconURL: null,
      },
      fields: [{
        name: `${client.prefix}daily`,
        value: `Get your daily 500 credits here.`,
        inline: false,
      },
      {
        name: `${client.prefix}cookie`,
        value: `Gives the first user mentioned a cookie.`,
        inline: false,
      },
      {
        name: `${client.prefix}emblem`,
        value: `RWBY emblems!`,
        inline: false,
      },
      {
        name: `${client.prefix}serverinfo`,
        value: `Info about the current server.`,
        inline: false,
      },
      {
        name: `${client.prefix}top`,
        value: `Shows the top 10 users with highest levels.`,
        inline: false,
      }],
    },
    other: {
      title: 'Official server',
      author: {
        name: `Penny commands`,
        url: null,
        iconURL: client.user.displayAvatarURL,
        proxyIconURL: null,
      },
      color: 9043849,
      url: 'https://discord.gg/kwcd9dq',
      footer: {
        text: 'PennyBot © Lilwiggy 2018',
        iconURL: null,
        proxyIconURL: null,
      },
      fields: [{
        name: `${client.prefix}invite`,
        value: `An invite link for Penny.`,
        inline: false,
      },
      {
        name: `${client.prefix}help`,
        value: `Does exactly what you think it does.`,
        inline: false,
      },
      {
        name: `${client.prefix}stats`,
        value: `Shows Penny's stats.`,
        inline: false,
      },
      {
        name: `${client.prefix}ht`,
        value: `Test your luck with a little heads or tails.`,
        inline: false,
      },
      {
        name: `${client.prefix}translate`,
        value: `Translates stuff. Usage: ${client.prefix}translate spanish | Hello, World!`,
        inline: false,
      },
      {
        name: `${client.prefix}parrot`,
        value: `Parrots <:parrot:430114874069090304>.`,
        inline: false,
      }],
    },
  };

  const pages = Object.keys(embeds);

  message.channel.send({
    embed: embeds.fun,
  }).then((msg) => {
    msg.react('⬅').then((e) => {
      e.message.react('➡');
    });
    client.help.set(message.author.id, 0);
    const filter = (r, user) => user.id === message.author.id;
    const collector = msg.createReactionCollector(filter, { time: 60000 });
    collector.on('collect', (r) => {
      r.remove(message.author.id);
      if (r.emoji.name === '⬅') {
        if (client.help.get(message.author.id) === 0) {
          client.help.set(message.author.id, pages.length - 1);
          msg.edit({ embed: embeds[pages[client.help.get(message.author.id)]] }).catch(console.error);
        } else {
          client.help.set(message.author.id, client.help.get(message.author.id) - 1);
          msg.edit({ embed: embeds[pages[client.help.get(message.author.id)]] }).catch(console.error);
        }
      } else if (r.emoji.name === '➡') {
        if (client.help.get(message.author.id) === pages.length - 1) {
          client.help.set(message.author.id, 0);
          msg.edit({ embed: embeds[pages[client.help.get(message.author.id)]] }).catch(console.error);
        } else {
          client.help.set(message.author.id, client.help.get(message.author.id) + 1);
          msg.edit({ embed: embeds[pages[client.help.get(message.author.id)]] }).catch(console.error);
        }
      }
    });
    collector.on('end', () => msg.delete().catch(console.error));
  });
};

exports.conf = {
  name: 'help',
  description: 'Who you gonna call?',
  usage: 'help',
  aliases: [],
};
