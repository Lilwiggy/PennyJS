exports.run = (client, message) => {
// Some docs for penny
  message.channel.send({ embed: {
    title: `Penny's documentation`,
    url: `https://github.com/Lilwiggy/Penny`,
    color: 9043849,
    thumbnail: { url: `https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png` },
    fields: [
      {
        name: `Links:`,
        value: `\n[Repo](https://github.com/Lilwiggy/Penny)\n[Testing branch](https://github.com/Lilwiggy/Penny/tree/testing)\n[Commands](https://github.com/Lilwiggy/Penny/tree/master/commands)`,
      },
    ],
  } });
};


exports.conf = {
  name: 'docs',
  description: 'docs',
  usage: 'docs',
  aliases: [`github`],
};
