exports.run = function (client, message,args, Discord, connection){
//Search doctorbating on urban dictionary
if(args.length == 1){
    message.channel.send("Usage: //define [Term to define]");
} else {
    var http = require('http');
    var url = `http://api.urbandictionary.com/v0/define?term=${message.content.substring(client.prefix.length + 6)}`;
    http.get(url, function(res) {
        var body = '';

        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
            var data = JSON.parse(body);
            
            if(data.result_type != "no_results"){
                if(data.list[0].definition.length > 1024){
                    message.channel.send("I'm sorry but the definition is too long for me to put in an embed.")
                } else {
            var embed = new Discord.RichEmbed()
            .setColor("#89ff89")
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
            .addField(`Definition for: ${message.content.substring(client.prefix.length + 6)}`, data.list[0].definition)
           message.channel.send(embed)
            }
         } else {
                message.channel.send("It seems that word doesn't have a definition.")
            }
        
        });
 })
}
}

exports.conf = {
    name: "define",
    category: "Miscelaneous",
    description: "Defines, things",
    usage: "define",
    aliases: []
}