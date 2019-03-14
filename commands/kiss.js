exports.run = (client, message) => {
// Witty comment here
  let images = require(`../images.json`);
  let kisses = images.kiss;

  //                Avril                dj
  let ppl = ['183668135474233345', '265659354378797056'];
  if (!message.mentions.users.first()) {
    message.channel.send(`Please mention a valid user.`);
    return;
  }

  if (message.author.id === message.mentions.users.first().id) {
    message.channel.send(`You cannot kiss yourself. Creep...`);
    return;
  }

  if (message.mentions.users.first().id === `232614905533038593` && !ppl.includes(message.author.id)) {
    message.channel.send(`${message.author.username} just tried to kiss Lilwiggy. Yeah that didn't work.`, { file: 'https://media2.giphy.com/media/xT9IgAWzvvcohEMofu/source.gif' });
    return;
  }

  let kiss = kisses[Math.floor(Math.random() * kisses.length)];
  message.channel.send(`${message.author.username} just gave ${message.mentions.users.first().username} a kiss!`, { file: kiss });
};


exports.conf = {
  name: 'kiss',
  description: 'Kisses a user',
  usage: 'kiss [user]',
  aliases: [],
};
