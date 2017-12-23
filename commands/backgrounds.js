exports.run = function (client, msg){
msg.channel.send(`View your profile here: https://pennybot.tk/me?userID=${msg.author.id}`)
}
//The most useless command here. Carry on.

exports.conf = {
    name: "backgrounds",
    category: "Miscelaneous",
    description: "View your backgrounds",
    usage: "background",
    aliases: []
}