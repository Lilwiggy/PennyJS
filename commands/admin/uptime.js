exports.run = (client, message) => {
// Another unfunny comment
  let date = new Date(null);
  date.setMilliseconds(client.uptime);
  let hours = date.toISOString().substr(11, 2);
  let minutes = date.toISOString().substr(14, 2);
  let seconds = date.toISOString().substr(17, 2);

  message.channel.send(`My uptime: ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`);
};


exports.conf = {
  name: 'uptime',
  description: '',
  usage: '',
  aliases: [],
};
