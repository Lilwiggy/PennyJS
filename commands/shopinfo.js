exports.run = function (client, message,args, Discord, connection){
//Info about our dugs I mean shop info.
    const data = require("../modules/shop.json");
    if(args.length === 1){
        message.channel.send("Usage: //shopinfo [item/type]")
    } else if(args[1].toLowerCase() === "emblems" || args[1].toLowerCase() === "emblem"){
        var embed = new Discord.RichEmbed()
        .addField(`Shop items for emblems. Use //shopinfo [item] for more info.`, `**adam01 | atlas | blake01 | cinder01 | coco | emerald01 | glynda01 | jaune01\nmercury01 | mistral | neptune | nora01 | ozpin01 | penny01| pyrrha01\nqrow01 | roman01 | ruby01 | salem | schnee | sun | vacuo | vale\nvelvet01 | weiss01 | whitefang | yang01 | zwei01 | ren01 | pumpkinpete**`)
        .setColor("#89ff89")
        message.channel.send({embed})
    } else if(args[1].toLowerCase() === "backgrounds" || args[1].toLowerCase() === "background"){
        var embed = new Discord.RichEmbed()
        .addField(`Shop items for backgrounds. Use //shopinfo [item] for more info.`, `**earth chan | adam02 | glynda02 | mercury02 | midna | ironwood | ren02 | raven\nruby02 | weiss02 | yang02 | blake02 | jaune02 \ncinder02 | emerald02 | kyoko | hina | velvet02\npyrrha02 | roman02 | yatsu | neo | penny02 | zwei02 | qrow02\nnora02 | ozpin02 | junko | monokuma | patreon\ngundham | sonia | kokichi | toko | leon | sakura | sayaka | chihiro | hajime | celeste\naang | appa | dude**`)
        .setColor("#89ff89")
        message.channel.send({embed})
    } else if(data[`${args[1]}`]){
        var embed = new Discord.RichEmbed()
        .addField(`Shop info for ${data[`${args[1]}`].name}'s ${data[`${args[1]}`].type}.`, `**Price**: ${data[`${args[1]}`].price} credits.\n**Purchase**: //set${data[`${args[1]}`].type} ${data[`${args[1]}`].name}`)
        .setImage(data[`${args[1]}`].image)
        .setColor("#89ff89")
        message.channel.send({embed})
    } else {
        message.channel.send("Shop info not found.")
    }
}

exports.conf = {
    name: "shopinfo",
    category: "Miscelaneous",
    description: "Drug info. I mean shop info.",
    usage: "shop info",
    aliases: []
}