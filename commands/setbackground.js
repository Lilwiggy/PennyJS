var fs = require('fs');
var json = JSON.parse(fs.readFileSync('../modules/shop.json'));
var backgrounds = [];
exports.run = function (client, message,args, Discord, connection){
//Background thingies!
for (var key in json) {
    if (json.hasOwnProperty(key)) {
        var item = json[key];
        if(!item.type == 'background') return;
        else if(item.name == 'patreon') return;
        else if(item.type == 'background'){
        backgrounds.push({
            "image": item.image,
            "price": item.price,
            "name": item.name,
        });
}
}
}

if(args.length === 1){
    return message.channel.send("Usage: //setbackground [background]\nBackground options are here: https://pennybot.tk/backgrounds")
}

switch(args[1].toLowerCase()) {
    case 'patreon':{
            connection.query("SELECT * FROM `User` WHERE `User_ID` = "+message.author.id+"", function(err, res, fields){
                if(res[0].patron === 1){
                    client.setBackground(message.author.id, message.author.username, message.author.avatarURL, "patreon", 0, message)
                } else {
                    message.channel.send("This background is for Patreons only.")
                }
            })
            break;}
    default:{
                try{
                    var background = backgrounds.filter(item => item.name == "patreon")
                    background
                    client.setBackground(message.author.id, message.author.username, message.author.avatarURL, backgrounds[0].name, backgrounds[0].price, message)

                }catch (e){
                    message.channel.send("Background options can be found here: http://pennybot.tk/backgrounds")
                }
            break;         
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
