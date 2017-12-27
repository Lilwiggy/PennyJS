exports.run = function(client, message, args, Discord, connection) {
    //dolla dolla bills y'all
    client.checkUser(message.author.id, message.author.avatarURL, function() {
        if (client.mirMap.get(message.guild.id) === 1) {
            message.channel.send("There is already a make it rain happening in this server.")
        } else {
            let cr = Math.floor(Math.random() * 1000)
            connection.query("SELECT * FROM `User` WHERE `User_ID` = " + message.author.id + "", function(err, res, fields) {
                if (res[0].Credits < cr) {
                    message.channel.send("I'm sorry but you do not have enough credits for this command.")
                } else {
                    client.mirMap.set(message.guild.id, 1)
                    connection.query("UPDATE `User` SET `Credits` = `Credits` - " + connection.escape(cr) + " WHERE `User_ID` = " + message.author.id + "")
                    message.channel.send(`${message.author.username} has just thrown ${cr} credits in the air! The first person to pick them up by saying "${client.prefix}grab" wins them!`)
                    var collector = message.channel.createMessageCollector(
                        m => m.content.toLowerCase() === `${client.prefix}grab` && m.author.id != message.author.id, {
                            time: 30000,
                            max: 1
                        }
                    );
                    collector.on('collect', m => {
                        connection.query("UPDATE `User` SET `Credits` = `Credits` + " + connection.escape(cr) + " WHERE `User_ID` = " + m.author.id + "")
                        message.channel.send(`Congrats ${m.author.username} you just won ${cr} credits!`).then(client.mirMap.set(message.guild.id, 0))
                        collector.stop;
                    });
                    collector.on('end', collected => {
                        if (collected.size === 0) {
                            message.channel.send("It seems as if no one has picked up the credits. Oh well.").then(client.mirMap.set(message.guild.id, 0))
                            connection.query("UPDATE `User` SET `Credits` = `Credits` + " + connection.escape(cr) + " WHERE `User_ID` = " + message.author.id + "")
                            collector.stop;
                        }
                    });
                }
            })


        }
    })
}

exports.conf = {
    name: "mir",
    description: "Make it rain my dudes",
    usage: "mir",
    aliases: []
}