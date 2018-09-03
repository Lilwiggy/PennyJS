exports.run = (client, message, args, Discord) => {
// Search doctorbating on urban dictionary
  if (args.length === 1) {
    message.channel.send(`Usage: ${client.prefix}define [Term to define]`);
  } else {
    var http = require('http');
    var url = `http://api.urbandictionary.com/v0/define?term=${message.content.substring(client.prefix.length + 6)}`;
    http.get(url, (res) => {
      var body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          let data = JSON.parse(body);
          if (data.result_type !== 'no_results') {
            if (data.list[0].definition.length > 1024) {
              message.channel.send("I'm sorry but the definition is too long for me to put in an embed.");
            } else {
              var embed = new Discord.RichEmbed()
                .setColor('#89ff89')
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
                .addField(`Definition for: ${message.content.substring(client.prefix.length + 6)}`, data.list[0].definition);
              message.channel.send(embed);
            }
          } else {
            message.channel.send("It seems that word doesn't have a definition.");
          }
        } catch (SyntaxError) {
          message.channel.send(`Sorry something went wrong. This usually happens when people use the ‘ character. Please don't do that.`);
        }
      });
    });
  }
};

exports.conf = {
  name: 'define',
  description: 'Gets a definition for a word from urban dictionary.',
  usage: 'define [thing to define]',
  aliases: [],
};
