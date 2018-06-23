exports.run = async (client, message) => {
// Mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm yes
  if (message.guild.me.hasPermission('MANAGE_WEBHOOKS')) {
    let hook = await message.channel.fetchWebhooks().then((h) => h.find('name', message.author.username));
    if (!hook)
     hook = await message.channel.createWebhook(message.author.username, message.author.displayAvatarURL);

    if (!checkHook(hook, message.author))
    hook = await hook.edit(message.author.username, message.author.displayAvatarURL); 

      const stuff = require(`../modules/embarrass.json`);
      const yes = stuff.things[Math.floor(Math.random() * stuff.things.length)];
      hook.send(yes);
  } else {
    message.channel.send(`I don't have permissions to make a webhook. Please change this in your guild settings.`);
  }
};

exports.conf = {
  name: 'embarrass',
  description: 'Yes',
  usage: 'Yes',
  aliases: ['suck'],
  hidden: true,
};


function checkHook(hook, user) {
  return `https://cdn.discordapp.com/avatars/${hook.id}/${hook.avatar}.png` === `https://cdn.discordapp.com/avatars/${user.id}/${user.id}.png`;
}
