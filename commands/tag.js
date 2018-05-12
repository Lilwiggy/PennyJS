exports.run = (client, message, args, Discord, connection) => {
// Some tag things
  let banned = ['create', 'info', 'delete'];
  if (args.length === 1) {
    message.channel.send(`Usage: ${client.prefix + exports.conf.usage}`);
  } else if (args[1] === 'create') {
    if (args[2]) {
      connection.query(`SELECT COUNT(*) AS inD FROM \`tags\` WHERE \`guild\` = ${message.guild.id} AND \`name\` = ${connection.escape(args[2])}`, (err, res) => {
        if (err)
          client.users.get(`232614905533038593`).send(`Error in tag check:\n${err}`);
        if (res[0].inD === 0) {
          let content = message.content.substr(12 + client.prefix.length + args[2].length);
          if (banned.includes(args[2]) || client.commands.get(args[2])) {
            message.channel.send(`You cannot make a tag with this name.`);
          } else if (content.length > 0) {
            connection.query(`INSERT INTO \`tags\` (\`guild\`, \`ID\`, \`owner\`, \`name\`, \`content\`) VALUES (${message.guild.id}, '${Date.now().toString(16)}', ${message.author.id}, ${connection.escape(args[2])}, ${connection.escape(content)})`);
            message.channel.send(`Tag ${args[2]} created successfully.`);
          } else {
            message.channel.send(`You need to include content in a tag.`);
          }
        } else {
          message.channel.send(`This tag already exists.`);
        }
      });
    } else {
      message.channel.send(`Usage: ${client.prefix}tag create [tag] [tag content]`);
    }
  } else if (args[1] === 'delete') {
    if (message.member.permissions.has('MANAGE_MESSAGES')) {
      if (args[2]) {
        connection.query(`SELECT COUNT(*) AS inD FROM \`tags\` WHERE \`guild\` = ${message.guild.id} AND \`name\` = ${connection.escape(args[2])}`, (err, res) => {
          if (err)
            client.users.get(`232614905533038593`).send(`Error in tag check:\n${err}`);

          if (res[0].inD === 0) {
            message.channel.send(`This tag does not exist`);
          } else {
            connection.query(`DELETE FROM \`tags\` WHERE \`name\` = ${connection.escape(args[2])} AND \`guild\` = ${message.guild.id}`);
            message.channel.send(`Tag ${args[2]} deleted.`);
          }
        });
      } else {
        message.channel.send(`Usage: ${client.prefix}tag delete [tag]`);
      }
    } else {
      message.channel.send(`This command is restricted to server mods.`);
    }
  } else if (args[1] === 'info') {
    if (args[2]) {
      connection.query(`SELECT COUNT(*) AS inD FROM \`tags\` WHERE \`guild\` = ${message.guild.id} AND \`name\` = ${connection.escape(args[2])}`, (err, res) => {
        if (err)
          client.users.get(`232614905533038593`).send(`Error in tag check:\n${err}`);

        if (res[0].inD === 0) {
          message.channel.send(`That tag does not exist.`);
        } else {
          connection.query(`SELECT * FROM \`tags\` WHERE \`name\` = ${connection.escape(args[2])} AND \`guild\` = ${message.guild.id}`, (e, tag) => {
            if (e)
              client.users.get(`232614905533038593`).send(`Error in tag check:\n${err}`);

            let user = message.guild.members.get(tag[0].owner);
            message.channel.send({ embed: {
              title: `Tag info for ${args[2]}`,
              color: 9043849,
              thumbnail: {
                url: user.user.displayAvatarURL,
              },
              fields: [
                {
                  name: `Owner`,
                  value: user.user.username,
                },
                {
                  name: `Tag ID`,
                  value: tag[0].ID,
                },
                {
                  name: `Uses`,
                  value: tag[0].used,
                },
              ],
            } });
          });
        }
      });
    } else {
      message.channel.send(`Usage: ${client.prefix}tag info [tag]`);
    }
  }
};


exports.conf = {
  name: 'tag',
  description: 'Create/remove tags',
  usage: 'tag [create/remove/info]\nExample tag usage: //hello',
  aliases: [],
};
