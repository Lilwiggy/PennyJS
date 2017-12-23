exports.run = (client, member, Disocrd, connection) => {
    //Oh hai Mark!
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

                   channel.send(`**${member.user.username}** just joined **${guild.name}**. ${results[0].WMessage}`)
            }
        })
    })

    //This is special for now. Please ignore it. Please....

    //THE DOPE FREAKING PENNY SERVER LINK IS RIGHT THE HIZZLE HERE MY MAN/WOMAN! https://discord.gg/kwcd9dq
    if (guild.id == "309531752014151690") {
        let role = guild.roles.find('name', 'Normies');
        member.addRole(role)
    } else

    //Sky's server
    if (guild.id == "303525154464727041") {
        let role = guild.roles.find('name', 'Users');
        member.addRole(role)
    }
    //PivotsXXD server
    if(guild.id === "346800980102348810"){
        let role = guild.roles.find("name", "Pivoteer");
        member.addRole(role)
    }
  }