exports.run = function (client, message,args, Discord, connection){
//*peaks over shoulder at atm*
if(args.length === 1){
    client.checkUser(message.author.id, message.author.username, message.author.avatarURL, function() {
        connection.query("SELECT Credits FROM User WHERE User_ID='" + message.author.id + "'", function(error, results, fields) {
            message.channel.send(`💰 You have ${results[0].Credits} credits. 💰`)
        });
    }) 
} else {
if(message.mentions.users.first()){


if(message.mentions.users.first().bot){
    message.channel.send("Bots don't have money silly!")
} else 
client.checkUser(message.mentions.users.first().id, message.mentions.users.first().username, message.mentions.users.first().avatarURL, function() {
    
                        connection.query("SELECT Credits FROM User WHERE User_ID='" + message.mentions.users.first().id + "'", function(error, results, fields) {
                            message.channel.send(`💰 ${message.mentions.users.first().username} has ${results[0].Credits} credits. 💰`)
    
                        });
    
                    })
                } else {
                    message.channel.send("Please mention a valid user.")
                }
}
}

exports.conf = {
    name: "credits",
    category: "Miscelaneous", 
    description: "How much coin?",
    usage: "credits",
    aliases: []
}