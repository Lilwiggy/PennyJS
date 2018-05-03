exports.run = (client, msg) => {
  // OWO What's this? You shouldn't be here, seriously this command is mine, MINE I SAY!
  msg.channel.send(`Such despair...`).catch(console.error);
};

exports.conf = {
  name: 'test',
  description: "It's a test command.",
  usage: 'test',
  aliases: [],
  hidden: true,
};
