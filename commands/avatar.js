exports.run = (client, message, args, Discord) => {
    //Fun fact: I was retarded before and forgot that I could get the avatar from the user object and made an extra API request to make myself feel special. Good times.
    if(args.length === 1){
        var embed = new Discord.RichEmbed()
                .setTitle(`Your avatar`)
                .setImage(message.author.displayAvatarURL)
               message.channel.send(embed)
    } else if(message.mentions.users.first()){
        var embed = new Discord.RichEmbed()
                .setTitle(`${message.mentions.users.first().username}'s avatar`)
                .setImage(message.mentions.users.first().displayAvatarURL)
               message.channel.send(embed)
    } else {
    try {
        let user = client.users.find("username", message.content.substring(client.prefix.length + 7))
                var embed = new Discord.RichEmbed()
                .setTitle(`${message.content.substring(client.prefix.length + 7)}'s avatar`)
                .setImage(user.displayAvatarURL)
               message.channel.send(embed)
    } catch (TypeError){
        message.channel.send("I'm sorry, but I could not find that user.")
    }
}
}

exports.conf = {
    name: "avatar",
    category: "Miscelaneous",
    description: "Yip yip?",
    usage: "avatar",
    aliases: []
}