exports.run = (client, message, args) => {
// YOU WANNA BE SLAPPED BOI!?
  if (args.length === 1) {
    message.channel.send(`${message.author.username} has just slapped themselves in confusion.`, {
      file: 'https://i2.wp.com/68.media.tumblr.com/3a47cda5a4639b7c41fad29e1f7e5b3b/tumblr_og6ol12tfk1tprwhqo4_540.gif',
    });
  } else if (!message.mentions.users.first() || message.mentions.users.first().id === message.author.id) {
    message.channel.send(`${message.author.username} has just slapped themselves in confusion.`, {
      file: 'https://i2.wp.com/68.media.tumblr.com/3a47cda5a4639b7c41fad29e1f7e5b3b/tumblr_og6ol12tfk1tprwhqo4_540.gif',
    });
  } else if (message.mentions.users.first().id === '232614905533038593') {
    message.channel.send(`${message.author.username} just tried to slap my creator, Lilwiggy, but instead slapped themselves in confusion.`, {
      file: 'https://i2.wp.com/68.media.tumblr.com/3a47cda5a4639b7c41fad29e1f7e5b3b/tumblr_og6ol12tfk1tprwhqo4_540.gif',
    });
  } else if (message.mentions.users.first().id === '309531399789215744') {
    message.channel.send(`${message.author.username} just tried to slap me. But they missed and I slapped them back.`, {
      file: 'https://i2.wp.com/68.media.tumblr.com/3a47cda5a4639b7c41fad29e1f7e5b3b/tumblr_og6ol12tfk1tprwhqo4_540.gif',
    });
  } else {
    message.channel.send(`${message.author.username} has just slapped ${message.mentions.users.first().username}.`, {
      file: 'https://i2.wp.com/68.media.tumblr.com/3a47cda5a4639b7c41fad29e1f7e5b3b/tumblr_og6ol12tfk1tprwhqo4_540.gif',
    });
  }
};

exports.conf = {
  name: 'slap',
  description: 'Slap someone.',
  usage: 'slap [@user]',
  aliases: [],
};
