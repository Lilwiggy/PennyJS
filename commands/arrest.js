exports.run = (client, message, args, Discord) => {
  // Witty comment here
  const Canvas = require(`canvas`);
  const fs = require('fs');
  const neko = require(`nekocurl`);
  let Image = Canvas.Image;
  let canvas = new Canvas(1000, 666);
  let ctx = canvas.getContext('2d');
  let img = new Image();
  async function render() {
    img.src = fs.readFileSync(`./arrest.png`);
    ctx.drawImage(img, 0, 0);
    img.src = await neko.get(message.author.displayAvatarURL, { autoString: false });
    ctx.drawImage(img, 75, 59, 200, 200);
    img.src = await neko.get(message.mentions.users.first().displayAvatarURL, { autoString: false });
    ctx.drawImage(img, 513, 4, 200, 200);
    canvas.toBuffer((err, buff) => {
      if (err)
        throw err;
      let pro = new Discord.Attachment()
        .setAttachment(buff, `anus blaster.png`);

      message.channel.send(`**${message.author.username}** has arrested **${message.mentions.users.first().username}**.`, {
        file: pro,
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
