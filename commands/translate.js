exports.run = function (client, message,args, Discord, connection){
//HOLA MI AMIGOS (Pretty sure this command is hella whack too)
const translate = require('translate-api');

if (args.length === 1) {
    message.channel.send("Usage: translate [language] | [stuff to translate]")
} else

    translate.getText(args.join(" ").substring(client.prefix.length + 10 + args[1]), {
        to: args[1]
    }).then(function(text) {
        var paul = text.text
        var hi = paul.split("|")
        message.channel.send(hi[1])
    })
}

exports.conf = {
    name: "translate",
    category: "Miscelaneous",
    description: "Translate things",
    usage: "translate",
    aliases: []
}