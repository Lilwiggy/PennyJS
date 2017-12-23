exports.run = function (client, message,args, Discord, connection){
    if(args.length === 1){
        var embed = new Discord.RichEmbed()
            .setTitle("Official server")
            .setAuthor("Commands")
            .setColor("#89ff89")
            .setURL("https://discord.gg/kwcd9dq")
            .setFooter('PennyBot © Lilwiggy 2017')
            .addField("Fun commands", "//help fun")
            .addField("Mod commands", "//help mod")
            .addField("Profile commands", "//help profile")
            .addField("Social commands", "//help social")
            .addField("Other commands", "//help other")
        message.channel.send({
            embed
        });
    } else {
         if (args[1] == "fun") {
        const embed = new Discord.RichEmbed()
            .setTitle("Official server")
            .setAuthor("Commands")
            .setColor("#89ff89")
            .setURL("https://discord.gg/kwcd9dq")
            .setFooter('PennyBot © Lilwiggy 2017')
            .addField("//waifu", "Wiggy is weird okay.")
            .addField("//nsfw waifu", "Only works in NSFW marked chats.")
            .addField("//slap", "Slaps the first user mentioned.")
            .addField("//highfive", "Highfives the first user mentioned.")
            .addField("//gamble", "Wanna gamble your money go ahead but don't come to me complaining when...")
            .addField("//define", "Searches Urban Dictionary for a word.")
            .addField("//osu", "Some OSU stats.")
            .addField("//mir", "Makes it rain. :sunglasses:")
        message.channel.send({
            embed
        })
    } else if (args[1] === "mod") {
        const embed = new Discord.RichEmbed()
            .setTitle("Official server")
            .setAuthor("Commands")
            .setColor("#89ff89")
            .setURL("https://discord.gg/kwcd9dq")
            .setFooter('PennyBot © Lilwiggy 2017')
            .addField("//kick", "Kicks the first user mentioned.")
            .addField("//ban", "Bans the first user mentioned.")
            .addField("//delete", "Deletes X number of messages.")
            .addField("//welcome", "Toggles welcome messages on or off.")
            .addField("//set welcome channel", "Selects the channel to welcome new users.")
            .addField("//set leave message", "Sets custom leave message.")
            .addField("//set welcome message", "Sets custom welcome message.")
            .addField("//set prefix", "Sets custom prefix for the server.")
        message.channel.send({
            embed
        })
    } else if (args[1] === "profile") {
        const embed = new Discord.RichEmbed()
            .setTitle("Official server")
            .setAuthor("Commands")
            .setColor("#89ff89")
            .setURL("https://discord.gg/kwcd9dq")
            .setFooter('PennyBot © Lilwiggy 2017')
            .addField("//profile", "Shows the user's profile.")
            .addField("//setbackground", "Sets custom background.")
            .addField("//backgrounds", "Links your profile online to view which backgrounds you own.")
            .addField("//credits", "Shows your credit amount.")
            .addField("//setemblem", "Sets an emblem for your profile.")
            .addField("//shopinfo", "You wanna blow your money on stuff? Then use this!")
        message.channel.send({
            embed
        })
    } else if (args[1] == "social") {
        const embed = new Discord.RichEmbed()
            .setTitle("Official server")
            .setAuthor("Commands")
            .setColor("#89ff89")
            .setURL("https://discord.gg/kwcd9dq")
            .setFooter('PennyBot © Lilwiggy 2017')
            .addField("//daily", "Gives you your daily 500 credits.")
            .addField("//cookie", "Gives a cookie to the first user mentioned.")
            .addField("//emblem", "RWBY emblems!")
        message.channel.send({
            embed
        })
    } else if (args[1] === "other") {
        const embed = new Discord.RichEmbed()
            .setTitle("Official server")
            .setAuthor("Commands")
            .setColor("#89ff89")
            .setURL("https://discord.gg/kwcd9dq")
            .setFooter('PennyBot © Lilwiggy 2017')
            .addField("//invite", "Sends an invite like for Penny.")
            .addField("//help", "Does exactly what you think it does.")
            .addField("//stats", "Shows the Penny's stats.")
            .addField("//ht", "Test your luck with a little heads or tails.")
            .addField("//translate", "Translates stuff. Usage: //translate spanish | Hello World")
            .addField("//serverinfo", "Displays information about the server.")
            .addField("//inspire", "Be inspired by these amazing quotes.")
        message.channel.send({
            embed
        })
    }
}
}

exports.conf = {
    name: "help",
    category: "Miscelaneous",
    description: "Who you gonna call?",
    usage: "help",
    aliases: []
}