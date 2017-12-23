exports.run = function (client, message,args, Discord, connection){
//Background thingies! (needs more)


if(args.length === 1){
    message.channel.send("Usage: //setbackground [background]\nBackground options are here: https://pennybot.tk/backgrounds")
} else {
      if(args[1].toLowerCase() === 'adam'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "adam", 500, message) 
    } else if(args[1].toLowerCase() === 'glynda'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "glynda", 1000, message) 
    } else if(args[1].toLowerCase() === 'mercury'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "mercury", 1000, message) 
    } else if(args[1].toLowerCase() === 'midna'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "midna", 1000, message) 
    } else if(args[1].toLowerCase() === 'ironwood'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "ironwood", 1000, message) 
    } else if(args[1].toLowerCase() === 'ren'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "ren", 2000, message) 
    } else if(args[1].toLowerCase() === 'raven'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "raven", 2000, message) 
    } else if(args[1].toLowerCase() === 'ruby'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "ruby", 2000, message) 
    } else if(args[1].toLowerCase() === 'weiss'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "weiss", 2000, message) 
    } else if(args[1].toLowerCase() === 'yang'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "yang", 2000, message) 
    } else if(args[1].toLowerCase() === 'blake'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "blake", 2000, message) 
    } else if(args[1].toLowerCase() === 'jaune'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "jaune", 2000, message) 
    } else if(args[1].toLowerCase() === 'cinder'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "cinder", 2000, message) 
    } else if(args[1].toLowerCase() === 'emerald'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "emerald", 2000, message) 
    }  else if(args[1].toLowerCase() === 'velvet'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "velvet", 2000, message) 
    } else if(args[1].toLowerCase() === 'pyrrha'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "pyrrha", 2000, message) 
    } else if(args[1].toLowerCase() === 'roman'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "roman", 2000, message) 
    } else if(args[1].toLowerCase() === 'yatsu'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "yatsu", 3000, message) 
    } else if(args[1].toLowerCase() === 'neo'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "neo", 3000, message) 
    } else if(args[1].toLowerCase() === 'penny'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "penny", 3000, message) 
    } else if(args[1].toLowerCase() === 'zwei'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "zwei", 3000, message) 
    } else if(args[1].toLowerCase() === 'qrow'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "qrow", 4000, message) 
    } else if(args[1].toLowerCase() === 'nora'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "nora", 4000, message) 
    }  else if(args[1].toLowerCase() === 'ozpin'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "ozpin", 4000, message) 
    } else if(args[1].toLowerCase() === 'kyoko'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "kyoko", 2000, message) 
    } else if(args[1].toLowerCase() === 'hina'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "hina", 2000, message) 
    } else if(args[1].toLowerCase() === 'monokuma'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "monokuma", 5000, message) 
    } else if(args[1].toLowerCase() === 'patreon'){
        connection.query("SELECT * FROM `User` WHERE `User_ID` = "+message.author.id+"", function(err, res, fields){
            if(res[0].patron === 1){
                client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "patreon", 0, message)
            } else {
                message.channel.send("This background is for Patreons only.")
            }
        })
         
    } else if(args[1].toLowerCase() === 'ibuki'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "ibuki", 4000, message) 
    } else if(args[1].toLowerCase() === 'chiaki'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "chiaki", 5000, message) 
    } else if(args[1].toLowerCase() === 'junko'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "junko", 4000, message) 
    } else if(args[1].toLowerCase() === 'earthchan'){
        client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "earthchan", 5, message) 
    } else {
        message.channel.send("Background options can be found here: http://pennybot.tk/backgrounds")
    }
}
}
exports.conf = {
    name: "setbackground",
    category: "Miscelaneous",
    description: "Set this to be kids with the hip",
    usage: "setbackground",
    aliases: []
}