// So uh, this is the guts of the profile command, it's very, uh, messy, best to ignore it.
exports.pro = (client, id, username, avatar, message, connection, Discord) => {
  message.channel.startTyping();
  client.checkUser(id, avatar, () => {
    connection.query(`SELECT * FROM \`User\` WHERE \`User_ID\` = '${id}'`, (err, res) => {
      if (err)
        throw err;
      const config = require('./config.json');
      const fs = require('fs');
      const Canvas = require('canvas');
      const neko = require('nekocurl');

      let Image = Canvas.Image;
      let canvas = new Canvas(1920, 1080);
      let ctx = canvas.getContext('2d');

      let img = new Image();
      let Font = Canvas.Font;

      let font = new Font('InriaSans', './fonts/inria-sans.regular.ttf');
      if (res[0].background && res[0].background !== 'default') {
        img.src = fs.readFileSync(`./backgrounds/${res[0].background}.png`);
        ctx.drawImage(img, 0, 0, 1920, 1080);
      } else {
        ctx.fillStyle = message.guild.members.get(id).displayHexColor;
        ctx.fillRect(0, 0, 1920, 1080);
      }
      ctx.addFont(font);
      ctx.font = `80px "Inria Sans"`;
      ctx.fillStyle = '#fff';
      img.src = fs.readFileSync('./backgrounds/thingy.png');
      ctx.globalAlpha = 0.73;
      ctx.drawImage(img, 25, 530);
      img.src = fs.readFileSync('./backgrounds/outline.png');
      ctx.globalAlpha = 0.4;
      ctx.drawImage(img, 25, 25, 450, 450);
      ctx.globalAlpha = 1;
      ctx.fillText(`Cookies: ${res[0].Cookie}`, 50, 620);
      ctx.fillText(`Credits: ${res[0].Credits}`, 50, 720);
      ctx.fillText(`Level: ${res[0].Level}`, 50, 820);
      ctx.fillText(`XP: ${res[0].XP} / ${res[0].Next}`, 50, 920);
      ctx.fillText(`Commands used: ${res[0].Used}`, 50, 1020);
      if (id === '232614905533038593') {
        img.src = fs.readFileSync('./emblems/dev.png');
        ctx.drawImage(img, 500, 300, 150, 150);
        ctx.font = `100px "Inria Sans"`;
        ctx.fillStyle = '#f2a8cb';
        ctx.fillText(`Penny Dev`, 500, 210);
      }
      if (config.mods.id.includes(id)) {
        img.src = fs.readFileSync('./emblems/ban.png');
        ctx.drawImage(img, 800, 820, 150, 150);
      }
      if (res[0].emblem) {
        img.src = fs.readFileSync(`./emblems/${res[0].emblem}.png`);
        ctx.drawImage(img, 800, 550, 150, 150);
      }
      if (res[0].patron === 1) {
        img.src = fs.readFileSync('./emblems/patron.png');
        ctx.drawImage(img, 800, 680, 150, 150);
      }
      // Load the avatar as a buffer all async like and stuff bro
      async function render() {
        img.src = await neko.get(avatar, { autoString: false });
        ctx.drawImage(img, 50, 50, 400, 400);

        canvas.toBuffer((e, buff) => {
          if (e)
            client.users.get(`232614905533038593`).send(`Error:\n${e}`);
          let pro = new Discord.Attachment()
            .setAttachment(buff, `${username}.png`);

          message.channel.send(`Profile card for **${username}**`, {
            file: pro,
          }).then(message.channel.stopTyping());
        });
      }
      render();
    });
  });
};
