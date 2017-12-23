exports.run = (client, member, Discord,  connection) => {
    //Should I stay or should I g- oh they left already...
    let guild = member.guild;
    client.checkServer(guild.id, guild.name, guild.iconURL, function() {

        connection.query("SELECT * FROM `Servers` WHERE `ServerID` = '" + guild.id + "'", function(error, results, fields) {
            if (results[0].Welcome == 0) {
                return;
            } else {
                const channel = member.guild.channels.get(results[0].wc)
                if(!channel){
                    return;
                } else

                   channel.send(`**${member.user.username}** just left **${guild.name}**. ${results[0].LMessage}`)
            }
        })
    })
   }