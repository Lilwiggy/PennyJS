exports.run = (client, message) => {
// Hot
  message.channel.send({ file: 'https://cdn.discordapp.com/attachments/289445794837168130/437282747610824710/latest.png' });
};


exports.conf = {
  name: 'giantmole',
  description: 'So hot',
  usage: '',
  aliases: ['mole'],
  hidden: true,
};
