exports.run = (client, message, args, Discord, connection) => {
  // for setting things

  if (message.member.hasPermission('ADMINISTRATOR')) {
  // Welcome message
    if (args[1] === 'welcome') {
      if (args[2] === 'message') {
        if (args.length === 3) {
          message.channel.send(`Usage: ${client.prefix}set welcome message [your message]`);
        } else {
          client.checkServer(message.guild.id, message.guild.name, message.guild.iconURL, () => {
            if (message.content.includes('@everyone') || message.content.includes('@here')) {
              message.channel.send("I'm sorry but I can't add an everyone mention.");
            } else {
              connection.query(`UPDATE \`Servers\` SET \`WMessage\` = ${connection.escape(message.content.substring(client.prefix.length + 19))} WHERE \`ServerID\` = ${message.guild.id}`, () => {
                message.channel.send(`Successfully made the welcome message: ${message.content.substring(client.prefix.length + 19)}
                \nNow please select the channel you would like to see these in by doing ${client.prefix}set welcome channel.`);
              });
            }
          });
        }
      } else if (args[2] === 'channel') {
        if (args.length === 3) {
          message.channel.send(`Usage: ${client.prefix}set welcome channel #channel`);
        } else
        if (!message.mentions.channels.first()) {
          message.channel.send('Please mention a valid chat.');
        } else {
          client.checkServer(message.guild.id, message.guild.name, message.guild.iconURL, () => {
            connection.query(`UPDATE \`Servers\` SET \`wc\` = ${connection.escape(message.mentions.channels.first().id)} WHERE \`ServerID\` = ${message.guild.id}`);
            message.channel.send(`Successfully made ${args[3]} the welcome channel.`);
          });
        }
      }
    } else if (args[1] === 'leave' && args[2] === 'message') {
      if (args.length === 3) {
        message.channel.send(`Usage: ${client.prefix}set leave message [your message]`);
      } else {
        client.checkServer(message.guild.id, message.guild.name, message.guild.iconURL, () => {
          if (message.content.includes('@everyone') || message.content.includes('@here')) {
            message.channel.send("I'm sorry but I can't add an everyone mention.");
          } else {
            connection.query(`UPDATE \`Servers\` SET \`LMessage\` = ${connection.escape(message.content.substring(client.prefix.length + 17))} WHERE \`ServerID\` = ${message.guild.id}`, () => {
              message.channel.send(`Successfully made the leave message: ${message.content.substring(client.prefix.length + 17)}`);
            });
          }
        });
      }
    } else if (args[1] === 'prefix') {
      if (args.length === 2) {
        message.channel.send(`Usage: ${client.prefix}set prefix newprefix`);
      } else if (args[2].length > 5) {
        message.channel.send("I'm sorry but your prefix cannot be longer than 5 characters.");
      } else {
        connection.query(`UPDATE \`Servers\` SET \`Prefix\` = ${connection.escape(args[2])} WHERE \`ServerID\` = ${message.guild.id}`);
        message.channel.send(`Successfully made ${args[2]} the prefix.`);
      }
    } else if (args[1] === 'mod' && args[2] === 'channel') {
      if (message.mentions.channels.first()) {
        connection.query(`UPDATE \`Servers\` SET \`mod_channel\` = ${connection.escape(message.mentions.channels.first().id)} WHERE \`ServerID\` = ${message.guild.id}`);
        message.channel.send(`I have set ${message.mentions.channels.first()} as the mod channel.`);
      } else {
        message.channel.send(`Usage: ${client.prefix}set mod channel #channel`);
      }
    }
  } else {
    message.channel.send(`This command is restricted to server admins.`);
  }
};

exports.conf = {
  name: 'set',
  description: 'Sets the stuff',
  usage: 'set [stuff]',
  aliases: [],
};
