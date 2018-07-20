exports.run = (client, message, args) => {
// GIVE ME WAIFUS
  const fs = require(`fs`);
  let images = require(`../images.json`);
  const urlReg = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
  let filter = (r, u) => (r.emoji.name === '✅' || r.emoji.name === '🗑') && u.id === '232614905533038593';
  if (args.length === 1) {
    message.channel.send(`Usage: ${client.prefix}suggest [waifu/nsfw] [link]`);
  } else if (args[1] === 'waifu') {
    if (!args[2]) {
      message.channel.send(`Usage: ${client.prefix}suggest waifu [link]`);
    } else if (urlReg.test(args[2])) {
      message.channel.send(`Thank you for your suggestion, I will let you know if your image is accepted!`);
      client.channels.get(`452955996629762058`).send({ embed: {
        title: `New waifu suggestion`,
        color: 16729927,
        image: {
          url: args[2],
        },
        fields: [
          {
            name: `User: ${message.author.username}#${message.author.discriminator}\n${message.author.id}`,
            value: `Message ID: ${message.id}`,
          },
        ],
      } }).then((msg) => {
        msg.react('✅').then((r) => {
          r.message.react('🗑');
        });
        let coll = msg.createReactionCollector(filter);
        coll.on(`collect`, (r) => {
          if (r.emoji.name === '✅') {
            if (images.waifu.includes(args[2])) {
              msg.edit({ embed: {
                title: `Duplicate waifu`,
                color: 16328487,
                image: {
                  url: args[2],
                },
              } });
              message.author.send(`Your waifu image: ${args[2]} was a duplicate entry! Sorry about that!`).catch(() => {
                message.reply(` your waifu image: ${args[2]} was a duplicate entry! Sorry about that!`);
              });
            } else {
              images.waifu.push(args[2]);
              fs.writeFile(`./images.json`, JSON.stringify(images, null, 2), (err) => {
                if (err)
                  console.log(err);

                msg.edit({ embed: {
                  title: `Added waifu`,
                  color: 8386943,
                  image: {
                    url: args[2],
                  },
                } });
              });
              message.author.send(`Your waifu image: ${args[2]} was approved!\nKeep an eye out for it in the waifu command!`).catch(() => {
                message.reply(` your waifu image: ${args[2]} was approved!\nKeep an eye out for it in the waifu command!`);
              });
            }
          } else if (r.emoji.name === '🗑') {
            msg.edit({ embed: {
              title: `Deleted waifu`,
              color: 14038839,
              image: {
                url: args[2],
              },
            } });
            message.author.send(`Your waifu image: ${args[2]} was denied.\nI guess it wasn't waifu material.`).catch(() => {
              message.reply(`your waifu image: ${args[2]} was denied.\nI guess it wasn't waifu material.`);
            });
          }
        });
      });
    } else {
      message.channel.send(`Please use a valid URL. Example: 
<https://i.redditmedia.com/FFyOQVvnqRHrh5mdvIlSkPkgwyKewh0kNTrfTGkKCB8.jpg?s=78f3642d9310340fcc61c90f1537f9a5>
or, <https://i.imgur.com/uyiWv1h.jpg>`);
    }
  } else if (args[1] === 'nsfw') {
    if (!args[2]) {
      message.channel.send(`Usage: ${client.prefix} suggest nsfw [link]`);
    } else if (urlReg.test(args[2])) {
      message.channel.send(`Thank you for your suggestion, I will let you know if your image is accepted!`);
      client.channels.get(`452969186763866113`).send({ embed: {
        title: `New nsfw suggestion`,
        color: 16729927,
        image: {
          url: args[2],
        },
        fields: [
          {
            name: `User: ${message.author.username}#${message.author.discriminator}\n${message.author.id}`,
            value: `Message ID: ${message.id}`,
          },
        ],
      } }).then((msg) => {
        msg.react('✅').then((r) => {
          r.message.react('🗑');
        });
        let coll = msg.createReactionCollector(filter);
        coll.on(`collect`, (r) => {
          if (r.emoji.name === '✅') {
            if (images.nsfw.includes(args[2])) {
              msg.edit({ embed: {
                title: `Duplicate nsfw`,
                color: 16328487,
                image: {
                  url: args[2],
                },
              } });
              message.author.send(`Your nsfw image was a duplicate entry! Sorry about that!`).catch(() => {
                message.reply(` your nsfw image was a duplicate entry! Sorry about that!`);
              });
            } else {
              images.nsfw.push(args[2]);
              fs.writeFile(`./images.json`, JSON.stringify(images, null, 2), (err) => {
                if (err)
                  console.log(err);

                msg.edit({ embed: {
                  title: `Added nsfw`,
                  color: 8386943,
                  image: {
                    url: args[2],
                  },
                } });
              });
              message.author.send(`Your nsfw image was added! Keep an eye out for it in the NSFW command!`).catch(() => {
                message.reply(` your nsfw image was added! Keep an eye out for it in the NSFW command!`);
              });
            }
          } else if (r.emoji.name === '🗑') {
            msg.edit({ embed: {
              title: `Deleted nsfw`,
              color: 14038839,
              image: {
                url: args[2],
              },
            } });
            message.author.send(`Your nsfw image was denied.`).catch(() => {
              message.reply(`your nsfw image was denied.`);
            });
          }
        });
      });
    } else {
      message.channel.send(`Please use a valid URL. Example: 
<https://i.redditmedia.com/FFyOQVvnqRHrh5mdvIlSkPkgwyKewh0kNTrfTGkKCB8.jpg?s=78f3642d9310340fcc61c90f1537f9a5>
or, <https://i.imgur.com/uyiWv1h.jpg>`);
    }
  }
};


exports.conf = {
  name: 'suggest',
  description: 'pls I need more waifus',
  usage: 'suggest [waifu/nsfw] [link]',
  aliases: [],
};
