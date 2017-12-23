exports.run = function (client, message,args, Discord, connection){
    //This command is best girl. Just sayin'
 var fs = require('fs')
 fs.readFile('waifu.txt', 'utf8', function(err, data){
     var responses = data.split(" | "); //Please note this function does not mean I am splitting up with said wiafu but mere splitting the data so the bot can read it better.
var response = responses[Math.floor(Math.random()* responses.length)]
var embed = new Discord.RichEmbed()
.setColor("#89ff89")
.setTitle("I approve.")
.setImage(response)
message.channel.send({embed})         
 })
}

exports.conf = {
    name: "waifu",
    category: "UHM BEST COMMAND EVER", //ON THE REAL THO
    description: "SERIOSULY THO THE BEST",
    usage: "waifu",
    aliases: []
}