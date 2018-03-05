// So uh, this is the guts of the profile command, it's very, uh, messy, best to ignore it.
const Jimp = require('jimp');
const config = require('./config.json');
exports.pro = (client, id, username, avatar, message, connection, Discord, discriminator) => {
  client.checkUser(id, avatar, () => {
    connection.query(`SELECT * FROM \`User\` WHERE \`User_ID\` = '${id}'`, (err, res) => {
      if (err)
        throw err;
      message.channel.startTyping();
      Jimp.read(`./backgrounds/default.png`, (d_err, image) => {
        if (err)
          throw err;
        if (res[0].background) {
          Jimp.read(`./backgrounds/${res[0].background}.png`, (b_err, background) => {
            background.resize(1920, 1080);
            image.composite(background, 1, 1);
            bigStuff(image, avatar, res, username, discriminator, Discord, message, id);
          });
        } else {
          bigStuff(image, avatar, res, username, discriminator, Discord, message, id);
        }
      });
    });
  });
};

function bigStuff(image, avatar, res, username, discriminator, Discord, message, id) {
  Jimp.read(`./backgrounds/outline.png`, (o_err, out) => {
    if (o_err)
      throw o_err;
    out.resize(450, 450);
    out.opacity(0.4);
    image.composite(out, 25, 25);
  });
  Jimp.read(`./backgrounds/thingy.png`, (t_err, thingy) => {
    if (t_err)
      throw t_err;
    thingy.opacity(0.73);
    image.composite(thingy, 25, 530);
  });
  if (res[0].patron === 1) {
    Jimp.read(`./emblems/patron.png`, (e_err, patron) => {
      if (e_err)
        throw e_err;
      patron.resize(150, 150);
      image.composite(patron, 800, 680);
    });
  }

  if (res[0].emblem) {
    Jimp.read(`./emblems/${res[0].emblem}.png`, (em_err, emblem) => {
      if (em_err)
        throw em_err;
      emblem.resize(150, 150);
      image.composite(emblem, 800, 550);
    });
  }

  if (config.mods.id.includes(id)) {
    Jimp.read(`./emblems/ban.png`, (b_err, ban) => {
      if (b_err)
        throw b_err;
      ban.resize(150, 150);
      image.composite(ban, 800, 820);
    });
  }

  if (id === `232614905533038593`) {
    Jimp.read(`./emblems/dev.png`, (d_err, dev) => {
      Jimp.loadFont('./fonts/sup.fnt').then((font) => {
        if (d_err)
          throw d_err;
        dev.resize(150, 150);
        image.composite(dev, 480, 300);
        image.print(font, 480, 210, `Penny dev`);
      });
    });
  }
  Jimp.read(avatar, (a_err, ava) => {
    ava.resize(400, 400);
    image.composite(ava, 50, 50);
    Jimp.loadFont('./fonts/sup.fnt').then((font) => {
      image.print(font, 50, 930, `XP: ${res[0].XP} / ${res[0].Next}`);
      image.print(font, 50, 803, `Level: ${res[0].Level}`);
      image.print(font, 50, 690, `Credits: ${res[0].Credits}`);
      image.print(font, 50, 570, `Cookies: ${res[0].Cookie}`);

      image.getBuffer(Jimp.MIME_PNG, (err, pl) => {
        if (err)
          throw err;
        let pro = new Discord.Attachment()
          .setAttachment(pl, `${username}.png`);

        message.channel.send(`Profile card for **${username}**`, {
          file: pro,
        }).then(message.channel.stopTyping());
      });
    });
  });
}
