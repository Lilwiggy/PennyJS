exports.run = (client, message, Discord, connection) => {
  //Now this is the fun bit right here

  const fs = require('fs');
    const msg = message.content.toLowerCase();
    const adminP = "p@"; //This is mine ignore it.
    //Custom prefix things
    client.checkServer(message.guild.id, message.guild.name, message.guild.iconURL, function() {})
    client.checkUser(message.author.id, message.author.displayAvatarURL, function () {})
    connection.query("SELECT * FROM `User` WHERE `User_ID` = "+message.author.id+"", function (err, res, fields){
        try{
            //This is for seeing if the user is blacklisted or not. Some people man smh.
        if(res[0].Blacklisted === 1)
            return;
        } catch (TypeError){
            console.log("Hi"); //Somehow this works trust me.
        }
    
    connection.query("SELECT * FROM `Servers` WHERE `ServerID` = '" + message.guild.id + "'", function(error, prefix, fields) {
        client.prefix = prefix[0].Prefix; //set that prefix boi

         //Gotta eay at argsbys *funny right?* Seriosuly tho, eat Arby's the food is fantastic and they make good memes on twitter
    const args = message.content.slice(client.prefix.length).split(" ");

    //To prevent the robot uprising...
    if(message.author.bot) return;

    //This gonna be an xp type thingy.
    client.checkUser(message.author.id, message.author.displayAvatarURL, function() {
        if(prefix[0].levels === 1){  
      connection.query("SELECT * FROM `User` WHERE `User_ID` = '" + message.author.id + "'", function(err, res, fields) {
          connection.query("SELECT *,NOW()-INTERVAL 2 MINUTE > `xp_cool` AS xpAdd FROM `User` WHERE `User_ID` = '" + message.author.id + "'", function(err1, res1, fields1) {
              if (res1[0].xpAdd === 1) {
                 
                  var xp = [Math.floor(Math.random() * 50)] //50 xp max at random. Just to make leveling up hard as balls

                  connection.query("UPDATE `User` SET `xp_cool`=NOW(), `XP`=`XP` + '" + xp + "' WHERE `User_ID` = '" + message.author.id + "'")
                  if (res[0].XP > res[0].Next) {
                      message.channel.send(`Congrats, ${message.author.username}! You just leveled up to level ${res[0].Level + 1}!`)
                      connection.query("UPDATE `User` SET `Level` = `Level` + 1, `Next` = `Next` + 500, `xp` = 0 WHERE `User_ID` = '" + message.author.id + "'")
                  }
              }
          })

      })
    }
  })

  //OWO
  if(message.content === "<@309531399789215744> OwO"){
    message.channel.send("What's this?")
} 

//Too lazy to put in a file tbh

//Set the welcome message
if(msg.startsWith(client.prefix + "set welcome channel")){
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (args.length == 3) {
            message.channel.send("Usage: //set welcome message [your message]")
        } else
            client.checkServer(message.guild.id, message.guild.name, message.guild.iconURL, function() {
    
                if (message.content.includes("@everyone")) {
                    message.channel.send("I'm sorry but I can't add an everyone mention.")
                    return;
                } else
                if (message.content.includes("@here")) {
                    message.channel.send("I'm sorry but I can't add an everyone mention.")
                    return;
                } else {
                    connection.query("UPDATE `Servers` SET `WMessage` = " + connection.escape(args.join(" ").substring(client.prefix.length + 19)) + " WHERE `ServerID` = '" + message.guild.id + "'", function(error, results, fields) {
                        message.channel.send(`Successfully made the welcome message: ${args.join(" ").substring(client.prefix.length + 19)}\nNow please select the channel you would like to see these in by doing //set welcome channel.`)
                    })
                }
            })
    } else {
        message.channel.send("This command is restricted to server admins.")
    }
}


//This is for setting a leave message
 if (msg.startsWith(client.prefix + "set leave message")) {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (args.length == 3) {
            message.channel.send("You did it wrong. Usage: //set leave message [your message]")
        } else
            client.checkServer(message.guild.id, message.guild.name, message.guild.iconURL, function() {
                if (message.content.includes("@everyone")) {
                    message.channel.send("I'm sorry but I can't add an everyone mention.")
                    return;
                } else
                if (message.content.includes("@here")) {
                    message.channel.send("I'm sorry but I can't add an everyone mention.")
                    return;
                } else {
                    connection.query("UPDATE `Servers` SET `LMessage` = " + connection.escape(args.join(" ").substring(client.prefix.length + 17)) + " WHERE `ServerID` = '" + message.guild.id + "'", function(error, results, fields) {
                        message.channel.send(`Successfully made the leave message: ${args.join(" ").substring(client.prefix.length + 17)}`)
                    })
                }
            })
    } else {
        message.channel.send("This command is restricted to server admins.")
    }
}


//And this is for setting a welcome channel. Again I was too lazy to put these in files.

 if(msg.startsWith(client.prefix + "set welcome channel")){
    if(message.member.hasPermission("ADMINISTRATOR")){
        if(args.length === 3){
        message.channel.send("Usage: //set welcome channel #channel")
        } else {
            var sl = args[3].substring(2)
            var last = sl.slice(0, sl.length - 1)
         var i = message.guild.channels.find("id", last)
         
         if(!i){
             message.channel.send("Please mention a valid chat.")
          } else {
              checkServer(message.guild.id, message.guild.name, message.guild.iconURL, function() {
                 connection.query("UPDATE `Servers` SET `wc` = "+connection.escape(last)+" WHERE `ServerID` = "+message.guild.id+"")
                 message.channel.send(`Successfully made ${args[3]} the welcome channel.`)
              })
              
          }
        }
    } else {
        message.channel.send("This command is restricted to server admins.")
    }
}


//This is how you set a new prefix
if(msg.startsWith(client.prefix + "set prefix")){
    if(message.member.hasPermission("ADMINISTRATOR")){
        if(args.length === 2){
            message.channel.send("Usage: //set prefix newprefix")
        } else {
            if (args[2].length > 5) {
                message.channel.send("I'm sorry but your prefix cannot be longer than 5 characters.")
            } else {
                connection.query("UPDATE `Servers` SET `Prefix` = " + connection.escape(args[2]) + " WHERE `ServerID` = '" + message.guild.id + "'")
                message.channel.send(`Successfully made ${args[2]} the prefix.`)
            }
        }
        
    } else {
        message.channel.send("This command is restricted to server admins.")
    }
}


//Okay uh, find yourslef a place by yourself to run this command please...
if(msg.startsWith(client.prefix + "nsfw waifu")){
    if(message.channel.nsfw){
        //WEW
        fs.readFile('nsfw.txt', 'utf8', function(err, data){
            var responses = data.split(" | ");
            var response = responses[Math.floor(Math.random()* responses.length)]
                    message.channel.send({file: response})
        })
                    
        
    } else {
        message.channel.send("I'm sorry but you must do this in an nsfw channel.")
    }
}


//This lets me check the bot's uptime

//Admin stats
if(msg.startsWith(adminP + "uptime") && message.author.id == "232614905533038593"){
    let date = new Date(null);
    date.setMilliseconds(client.uptime);
    let hours = date.toISOString().substr(11, 2);
    let minutes = date.toISOString().substr(14, 2);
    let seconds = date.toISOString().substr(17, 2);

    message.channel.send(`My uptime: ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`)
}


//This lets me add things to the nsfw file for the nsfw command
if(msg.startsWith(adminP + "add") && message.author.id === "232614905533038593"){
        if(args.length === 1){
            message.channel.send("Bruh you forgot the link.")
        } else {        
            fs.readFile('nsfw.txt', 'utf8', function(err, data){
            if(data.includes(args[1])){
                message.channel.send("This image already exists in the file.")
            } else {
                fs.appendFile('nsfw.txt', ` | ${args[1]}`, 'utf8', function(err) {
        if(err){
        message.channel.send("Whoops something went wrong.")
    } else {
        message.channel.send("Added the link to the NSFW file.")
    }
    })
            }
        })
        }
    }

        //This lets me add images to the waifu file when I need to
        if(msg.startsWith(adminP + "waifu") && message.author.id === "232614905533038593"){
                if(args.length === 1){
                    message.channel.send("Bruh you forgot the link.")
                } else {
                fs.readFile('waifu.txt', 'utf8', function(err, data){
                    if(data.includes(args[1])){
                        message.channel.send("This image already exists in the file.")
                    } else {
                        fs.appendFile('waifu.txt', ` | ${args[1]}`, 'utf8', function(err) {
                if(err){
                message.channel.send("Whoops something went wrong." + err)
            } else {
                message.channel.send("Added the link to the Waifu file.")
            }
            })
                    }
                })
                }
        }


        //This uh, this lets the bot text me. Yes, text me. No you cannot have my number, gosh.
        if(msg.startsWith(adminP + "text") && message.author.id == "232614905533038593"){
// Sending an SMS using the Twilio API
// Twilio Credentials
const accountSid = '';
const authToken = '';
// require the Twilio module and create a REST client
const tlp = require('twilio')(accountSid, authToken);

fs.readFile('waifu.txt', 'utf8', function(err, data){
    var responses = data.split(" | ");
var response = responses[Math.floor(Math.random()* responses.length)]

tlp.messages
.create({
  to: '',
  from: '',
  body: "Here is your daily Waifu sir:",
  mediaUrl: response,
})
.then(message.channel.send("Enjoy your personal waifu sir."))
            
})

}


//This allows me to add patreons to my db
if(msg.startsWith(adminP + "patreon add") && message.author.id === "232614905533038593"){
    if(message.mentions.users.first()){
        connection.query("UPDATE `User` SET `patron` = 1 WHERE `User_ID` = "+message.mentions.users.first().id+"")
        message.channel.send(`${message.mentions.users.first().username} is now a patron.`)
    } else {
        message.channel.send("Who am I adding as a patreon?")
    }
}

//This allows me to restart the bot when she is being cranky.
if(msg.startsWith(adminP + "restart") && message.author.id === "232614905533038593"){
    message.channel.send("Restarting...")
    setTimeout(function () {
        pm2.restart("index.js");
    }, 500);
    
}

//And this allows me to rule the world.
if(msg.startsWith(adminP + "eval") && message.author.id === "232614905533038593"){
    function clean(text) {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
      }
    if(args.length === 1){
        message.channel.send("What am I evaling?")
    } else {
        try{
            let evaled = eval(message.content.substr(adminP.length + 4));
            if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
            message.channel.send(clean(evaled));
      
    } catch (err){
        message.channel.send(`${clean(err)}`);
    }
        
         
    }
}

//Add users to be blacklisted.
if(msg.startsWith(adminP + "blackist") && message.author.id === "232614905533038593"){
        if(args[1]){
            connection.query("SELECT * FROM `User` WHERE `User_ID` = "+connection.escape(args[1])+"", function(err, res, fields){
                if(res[0].Blicklisted === 1){
                    message.channel.send("This user is already blacklisted.")
                } else {
                    connection.query("UPDATE `User` SET `Blacklisted` = 1 WHERE `User_ID` = "+connection.escape(args[1])+"")
                    message.channel.send(`${res[0].UserName} has been blacklisted.`)
                }
            })
        } else {
            message.channel.send("Who would you like to blacklist?")
        } 
}


//What's yo prefix yo dawg home boy slice dude?
if(msg.startsWith("<@309531399789215744> prefix") || msg.startsWith("<@309531399789215744> what's your prefix") || msg.startsWith("<@309531399789215744> whats your prefix")){
    message.channel.send(`My prefix for the server is: ${client.prefix}`)
}


    //This uh, uhm, yeah it does that one thing where it ignores things with some other bits.
    if(message.content.indexOf(client.prefix) !== 0) return;

    const command = message.content.toLowerCase().substr(client.prefix.length).split(" ")
    const cmd = client.commands.get(command[0]) || client.commands.get(client.aliases.get(command[0]));
//And finally we run the command when we get it but we need to be sure the command exists or else it no workie and the bot crashes :(
if(cmd)
    cmd.run(client, message, args, Discord, connection);
  });//BLACKLISTED
}); //PREFIX
}
