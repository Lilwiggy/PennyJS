exports.run = (client, message) => {
// Another unfunny comment
  let date = new Date();
  let days = date.getDay() - client.readyAt.getDay();
  let hours = date.getHours() - client.readyAt.getHours();
  let minutes = date.getMinutes() - client.readyAt.getMinutes();
  let seconds = date.getSeconds() - client.readyAt.getSeconds();

  message.channel.send(`My uptime: ${days} days ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`);
};


exports.conf = {
  name: 'uptime',
  description: '',
  usage: '',
  aliases: [],
};
