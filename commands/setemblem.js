exports.run = function (client, message,args, Discord, connection){
//Basically badges, BUT BETTER IN EVERY WAY!
if(args.length === 1){
    message.channel.send("Usage: //setemblem [emblem]")
} else {
    //Oh also these are a bit more expensive than backgrounds. So ha! Save and spen your monies
    if(args[1].toLowerCase() === 'adam'){
        client.setEmblem(message.author.id, message.author.avatarURL, "adam", 1000, message) 
    } else if(args[1] .toLowerCase()=== 'atlas'){
        client.setEmblem(message.author.id, message.author.avatarURL, "atlas", 1000, message) 
    } else if (args[1].toLowerCase() === 'blake'){
        client.setEmblem(message.author.id, message.author.avatarURL, "blake", 3000, message) 
    } else if(args[1].toLowerCase() === "cinder"){
        client.setEmblem(message.author.id, message.author.avatarURL, "cinder", 2000, message) 
    } else if(args[1].toLowerCase() === "coco"){
        client.setEmblem(message.author.id, message.author.avatarURL, "coco", 1000, message) 
    } else if(args[1].toLowerCase() === "emerald") {
        client.setEmblem(message.author.id, message.author.avatarURL, "emerald", 2000, message) 
    } else if(args[1].toLowerCase() === "glynda"){
        client.setEmblem(message.author.id, message.author.avatarURL, "glynda", 2000, message) 
    } else if(args[1].toLowerCase() === "jaune"){
        client.setEmblem(message.author.id, message.author.avatarURL, "jaune", 3000, message) 
    } else if(args[1].toLowerCase() === "mercury"){
        client.setEmblem(message.author.id, message.author.avatarURL, "mercury", 2000, message) 
    } else if(args[1].toLowerCase() === "mistral"){
        client.setEmblem(message.author.id, message.author.avatarURL, "mistral", 2000, message) 
    } else if(args[1].toLowerCase() === "neptune"){
        client.setEmblem(message.author.id, message.author.avatarURL, "neptune", 1000, message) 
    } else if(args[1].toLowerCase() === "nora"){
        client.setEmblem(message.author.id, message.author.avatarURL, "nora", 4000, message) 
    } else if(args[1].toLowerCase() === "ozpin"){
        client.setEmblem(message.author.id, message.author.avatarURL, "ozpin", 4000, message) 
    } else if(args[1].toLowerCase() === "penny"){
        client.setEmblem(message.author.id, message.author.avatarURL, "penny", 4000, message) 
    } else if(args[1].toLowerCase() === "pyrrha"){
        client.setEmblem(message.author.id, message.author.avatarURL, "pyrrha", 3000, message) 
    } else if(args[1].toLowerCase() === "qrow"){
        client.setEmblem(message.author.id, message.author.avatarURL, "qrow", 4000, message) 
    } else if(args[1].toLowerCase() === "roman"){
        client.setEmblem(message.author.id, message.author.avatarURL, "roman", 2000, message) 
    } else if(args[1].toLowerCase() === "ruby"){
        client.setEmblem(message.author.id, message.author.avatarURL, "ruby", 4000, message) 
    } else if(args[1].toLowerCase() === "salem"){
        client.setEmblem(message.author.id, message.author.avatarURL, "salem", 5000, message) 
    } else if(args[1].toLowerCase() === "schnee"){
        client.setEmblem(message.author.id, message.author.avatarURL, "schnee", 2000, message) 
    } else if(args[1].toLowerCase() === "sun"){
        client.setEmblem(message.author.id, message.author.avatarURL, "sun", 3000, message) 
    } else if(args[1].toLowerCase() === "vacuo"){
        client.setEmblem(message.author.id, message.author.avatarURL, "vacuo", 2000, message) 
    } else if(args[1].toLowerCase() === "vale"){
        client.setEmblem(message.author.id, message.author.avatarURL, "vale", 2000, message) 
    } else if(args[1].toLowerCase() === "velvet"){
        client.setEmblem(message.author.id, message.author.avatarURL, "velvet", 2000, message) 
    } else if (args[1].toLowerCase() === "weiss"){
        client.setEmblem(message.author.id, message.author.avatarURL, "weiss", 4000, message) 
    } else if(args[1].toLowerCase() === "whitefang"){
        client.setEmblem(message.author.id, message.author.avatarURL, "whitefang", 3000, message) 
    } else if(args[1].toLowerCase() === "yang"){
        client.setEmblem(message.author.id, message.author.avatarURL, "yang", 4000, message) 
    } else if(args[1].toLowerCase() === "zwei") {
        client.setEmblem(message.author.id, message.author.avatarURL, "zwei", 5000, message)
    } else if(args[1].toLowerCase() === "pumpkinpete"){
        client.setEmblem(message.author.id, message.author.avatarURL, "pumpkinpete", 8000, message)
    } else if(args[1].toLowerCase() === "ren"){
        client.setEmblem(message.author.id, message.author.avatarURL, "ren", 5000, message)
    } else { 
    message.channel.send("Please use a valid emblem. You can view the options by doing //shopinfo emblems")
    }
    //Nice wall of code isn't it?
}

}

exports.conf = {
    name: "setemblem",
    description: "Gotta get them emblem bois",
    usage: "setemblem",
    aliases: []
}