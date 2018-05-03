exports.run = (client, message) => {
// Witty comment here
  if (message.author.id === '191755337345400832' || message.author.id === '232614905533038593')
    message.channel.send(`**Lilwiggy** has been **banned** from *Pivoteers*.`);
};


exports.conf = {
  name: 'pivots',
  description: '',
  usage: '',
  aliases: [],
  hidden: true,
};
