exports.run = function (client, message,args, Discord, connection){
message.channel.send("I'm combat ready! https://discordapp.com/oauth2/authorize?client_id=309531399789215744&scope=bot&permissions=36809798");
}

exports.conf = {
    name: "invite",
    category: "Miscelaneous",
    description: "Invite me pls",
    usage: "invite",
    aliases: []
}