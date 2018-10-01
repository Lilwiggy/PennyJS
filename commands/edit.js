exports.run = (client, message, args, Discord, connection) => {
  let role = message.content.slice(client.prefix.length + args[0].length).split(' | ');
  let r_id;
  let edit = true;
  let blacklisted = [];
  client.checkServer(message.guild.id, message.guild.name, message.guild.iconURL, () => {
    connection.query(`SELECT * FROM \`Servers\` WHERE \`ServerID\` = ${message.guild.id}`, (err, guild) => {
      if (err)
        throw err;
      if (guild[0].edits === 1) {
        // do shit
        message.guild.roles.filter((guildRole) => {
          if (guildRole.name.toLowerCase() === role[0].toLowerCase().trim())
            r_id = guildRole.id;
        });
        connection.query(`SELECT * FROM \`roles\` WHERE \`guild\` = ${message.guild.id}`, (err, res) => {
          if (err)
            throw err;
          res.forEach((data) => {
            blacklisted.push(data.role);
          });
          if (blacklisted.includes(r_id))
            edit = false;
          if (args[1] && role[1]) {
            if (!edit) {
              message.channel.send('Sorry but you aren\'t allowed to edit this role.');
            } else if (message.member.roles.find((r) => r.name.toLowerCase() === role[0].toLowerCase().trim())) {
              message.member.roles.filter((memberRole) => {
                if (memberRole.name.toLowerCase() === role[0].toLowerCase().trim()) {
                  let hexThing = /^#[0-9A-F]{6}$/i;
                  if (hexThing.test(role[1])) {
                    let rtu = memberRole;
                    if (rtu.editable) {
                      rtu.setColor(role[1], `Color change requested by ${message.author.username}`);
                      message.channel.send(`Your role color is now ${role[1]}. Enjoy!`);
                    } else {
                      message.channel.send(`Coud not edit role. Missing permissions.`);
                    }
                  } else {
                    message.channel.send('Please use a valid hex code.');
                  }
                }
              });
            } else {
              message.channel.send(`You can only edit roles you have!`);
            }
          } else {
            message.channel.send(`Usage: ${client.prefix}edit role name | hex`);
          }
        });
      } else {
        message.channel.send(`This server has role edits disabled.`);
      }
    });
  });
};


exports.conf = {
  name: 'edit',
  description: 'Edit a role\'s color.',
  usage: 'edit role | [hex]',
  aliases: [],
};
