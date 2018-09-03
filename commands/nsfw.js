exports.run = (client, message) => {
  // I know what you're doing here ( ͡° ͜ʖ ͡°)
  if (!message.channel.nsfw) {
    message.channel.send(`This channel is not marked as NSFW.`);
  } else {
    let images = require(`../images.json`);
    if (!client.guilds.get(message.guild.id).nsfwArr)
      client.guilds.get(message.guild.id).nsfwArr = [];
    message.channel.send({ file: randomImage(client.guilds.get(message.guild.id).nsfwArr, images.nsfw) });
  }
};

function randomImage(arr, images) {
  let ran = images[Math.floor(Math.random() * images.length)];
  if (arr.length === images.length) {
    arr = [];
    return ran;
  } else {
    shuffle(arr);
    if (arr.includes(ran)) {
      randomImage(arr, images);
    } else {
      arr.push(ran);
      return ran;
    }
  }
}

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
// <3
function shuffle(a) {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
exports.conf = {
  name: 'nsfw',
  description: 'Posts a random NSFW image. Only works in NSFW labeled chats.',
  usage: 'nsfw',
  aliases: [],
};
