exports.run = (client, message) => {
// Yes
  if (message.guild.id !== '151760749918683137') return;

  message.channel.send({ file: 'https://i.imgur.com/AwcjUr8.png' });
};


exports.conf = {
  name: 'chozo',
  description: 'Dank maymay',
  usage: '',
  aliases: [],
  hidden: true,
};
