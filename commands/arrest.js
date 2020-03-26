exports.run = (client, message, args, Discord) => {
  // Witty comment here
  const { createCanvas, Image } = require('canvas');
  const fs = require('fs');
  const neko = require(`nekocurl`);
  let canvas = createCanvas(1000, 666);
  let img = new Image();
  let ctx = canvas.getContext('2d');
  async function render() {
    img.src = fs.readFileSync(`./arrest.png`);
    ctx.drawImage(img, 0, 0);
    img.src = await neko.get(message.author.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }), { autoString: false });
    ctx.drawImage(img, 75, 59, 200, 200);
    img.src = await neko.get(message.mentions.users.first().displayAvatarURL({ format: 'png', size: 2048, dynamic: true }), { autoString: false });
    ctx.drawImage(img, 513, 4, 200, 200);
    canvas.toBuffer((err, buff) => {
      if (err)
        throw err;
      let pro = new Discord.MessageAttachment(buff, `anus blaster.png`);

      message.channel.send(`**${message.author.username}** has arrested **${message.mentions.users.first().username}**.`, {
        files: [pro],
      });
    });
  }
  if (message.mentions.users.first())
    render();
  else
    message.channel.send(`Usage: ${client.prefix}arrest @user.`);
};


exports.conf = {
  name: 'arrest',
  description: 'Arrest a user for being naughty ;)',
  usage: 'arrest @user',
  aliases: [],
  hidden: true,
};
