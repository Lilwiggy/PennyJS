exports.run = (client, message) => {
// Witty comment here
  const fs = require('fs');

  client.commands = new Map();
  client.adminCommands = new Map();
  client.aliases = new Map();

  // This is the bit that does the things with the commands man
  fs.readdir('./commands/', (err, cmdFiles) => {
    if (err)
      throw err;
    message.channel.send(`Loaded ${cmdFiles.length} commands.`);
    cmdFiles.forEach((f) => {
      if (!f.endsWith('.js'))
        return;
      delete require.cache[require.resolve(`../../commands/${f}`)];
      const response = client.loadCommand(f);
      if (response)
        console.log(response);
    });
  });
  // Admin commands to clean up the message event
  fs.readdir('./commands/admin', (err, cmdFiles) => {
    if (err)
      throw err;
    message.channel.send(`Loaded ${cmdFiles.length} admin commands.`);
    cmdFiles.forEach((f) => {
      if (!f.endsWith('.js'))
        return;
      delete require.cache[require.resolve(`../../commands/admin/${f}`)];
      const response = client.loadAdminCommand(f);
      if (response)
        console.log(response);
    });
  });
};


exports.conf = {
  name: 'reload',
  description: 'Reloads commands without restarting the bot.',
  usage: 'reload',
  aliases: [],
};
