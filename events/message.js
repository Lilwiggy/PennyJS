exports.run = (client, message, Discord, connection) => {
  // Now this is the fun bit right here
  const msg = message.content.toLowerCase();
  const adminP = 'fucking '; // This is mine ignore it.

  // To prevent the robot uprising...
  if (message.author.bot)
    return;
  if (message.channel.type !== 'text')
    return;

  // Custom prefix things
  client.checkServer(message.guild.id, message.guild.name, message.guild.iconURL, () => {
    connection.query(`SELECT * FROM \`Servers\` WHERE \`ServerID\` = '${message.guild.id}'`, (error, prefix) => {
      client.checkUser(message.author.id, message.author.displayAvatarURL, () => {
        connection.query(`SELECT * FROM \`User\` WHERE \`User_ID\` = ${message.author.id}`, (err, res) => {
          if (err)
            throw err;
          try {
            // This is for seeing if the user is blacklisted or not. Some people man smh.
            if (res[0].Blacklisted === 1) {
              return;
            } else {
              // This uh, uhm, yeah it does that one thing where it ignores things with some other bits.
              if (message.content.startsWith(client.prefix))
                connection.query(`UPDATE \`User\` SET \`Used\` = \`Used\` + 1 WHERE \`User_ID\` = ${message.author.id}`);
              if (message.content.indexOf(client.prefix) !== 0)
                return;

              const command = message.content.toLowerCase().substr(client.prefix.length).split(' ');
              const cmd = client.commands.get(command[0]) || client.commands.get(client.aliases.get(command[0]));
              // And finally we run the command when we get it but we need to be sure the command exists or else it no workie and the bot crashes :(
              if (cmd) {
                try {
                  cmd.run(client, message, args, Discord, connection);
                } catch (e) {
                  client.users.get('232614905533038593').send(`Error:\n${e}\nUsed in:\n${message.content}`);
                }
              }
            }
          } catch (TypeError) {
            console.log('Hi'); // Somehow this works trust me.
          }
          if (prefix[0].levels === 1)
            xpAdd(connection, message);
        });

        client.prefix = prefix[0].Prefix; // set that prefix boi

        // Gotta eay at argsbys *funny right?* Seriosuly tho, eat Arby's the food is fantastic and they make good memes on twitter
        const args = message.content.slice(client.prefix.length).split(' ');

        // What's yo prefix yo dawg home boy slice dude?
        if (message.mentions.users.first() === client.user && (args[1] === 'prefix' || args[1] === 'help'))
          message.channel.send(`My prefix for the server is: ${client.prefix}`);

        let em = /<a?:\w+:\d+>/g;
        if (em.test(message.content)) {
          let em_id = /[0-9]/g;
          let r = message.content.match(em_id).join('');
          if (r.length > 18) {
            if (message.guild.emojis.get(r.substr(0, 18)))
              client.emoteCheck(message.guild.id, r.substr(0, 18));
          } else if (message.guild.emojis.get(r)) {
            client.emoteCheck(message.guild.id, r);
          }
        }

        // OWO
        if (message.content === '<@309531399789215744> OwO')
          message.channel.send("What's this?");

        // Admin commands

        if (msg.startsWith(adminP) && message.author.id === '232614905533038593') {
          const adminCommand = message.content.toLowerCase().substr(adminP.length).split(' ');
          const adminCmd = client.adminCommands.get(adminCommand[0]);
          if (adminCmd) {
            try {
              adminCmd.run(client, message, args, Discord, connection);
            } catch (e) {
              client.users.get('232614905533038593').send(`Error:\n${e}\nUsed in:\n${message.content}`);
            }
          }
        }
      });// BLACKLISTED
    }); // PREFIX
  });
};

function xpAdd(connection, message) {
  connection.query(`SELECT * FROM \`User\` WHERE \`User_ID\` = '${message.author.id}'`, (err, res) => {
    if (err)
      throw err;
    connection.query(`SELECT *,NOW()-INTERVAL 2 MINUTE > \`xp_cool\` AS xpAdd FROM \`User\` WHERE \`User_ID\` = '${message.author.id}'`, (err1, res1) => {
      if (err1)
        throw err1;
      if (res1[0].xpAdd === 1) {
        var xp = [Math.floor(Math.random() * 50)]; // 50 xp max at random. Just to make leveling up hard as balls
        connection.query(`UPDATE \`User\` SET \`xp_cool\`=NOW(), \`XP\`=\`XP\` + '${xp}' WHERE \`User_ID\` = '${message.author.id}'`);
        if (res[0].XP > res[0].Next) {
          message.channel.send(`Congrats, ${message.author.username}! You just leveled up to level ${res[0].Level + 1}!`);
          connection.query(`UPDATE \`User\` SET \`Level\` = \`Level\` + 1, \`Next\` = \`Next\` + 500, \`xp\` = 0 WHERE \`User_ID\` = '${message.author.id}'`);
        }
      }
    });
  });
}
