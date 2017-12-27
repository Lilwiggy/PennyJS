exports.run = (client, message, args, Discord, connection) => {
    //Enable this stuff cause it's awesome 
    if(message.member.hasPermission("ADMINISTRATOR")){
    if(args.length < 2){
        message.channel.send("Usage: //enable [thing to disable]")
    } else if(args[1] === "levels"){
        client.checkServer(message.guild.id, message.guild.name, message.guild.iconURL, function () {
            connection.query("UPDATE `Servers` SET `levels` = 1 WHERE `ServerID` = "+message.guild.id+"")
            message.channel.send("Successfully enabled levels.")
        })
    }
    } else {
        message.channel.send("This command is restricted to server admins.")
    }
    }
    
    exports.conf = {
        name: "enable",
        description: "Enables the thingies n such",
        aliases: []
    }