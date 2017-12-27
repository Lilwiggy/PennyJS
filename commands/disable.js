exports.run = (client, message, args, Discord, connection) => {
//Disable this stuff cause it gets annoying 
if(message.member.hasPermission("ADMINISTRATOR")){
if(args.length < 2){
    message.channel.send("Usage: //disable [thing to disable]")
} else if(args[1] === "levels"){
    client.checkServer(message.guild.id, message.guild.name, message.guild.iconURL, function () {
        connection.query("UPDATE `Servers` SET `levels` = 0 WHERE `ServerID` = "+message.guild.id+"")
        message.channel.send("Successfully disabled levels.")
    })
}
} else {
    message.channel.send("This command is restricted to server admins.")
}
}

exports.conf = {
    name: "disable",
    description: "Disables things n shiz",
    aliases: []
}