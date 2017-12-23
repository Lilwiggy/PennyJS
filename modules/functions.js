module.exports = (client, connection) => {

    //Super secret spy stuff that I took "inspiration" from An Idiot's guide for. It just loads commands and stuff, I made it a little different. DON'T SHAME ME! 
    client.loadCommand = (commandName) => {
        try {
            const props = require(`../commands/${commandName}`);
            console.log(`Loading Command: ${props.conf.name}. `);
            if (props.init) {
              props.init(client);
            }
            client.commands.set(props.conf.name, props);
            props.conf.aliases.forEach(alias => {
              client.aliases.set(alias, props.conf.name);
            });
            return false;
          } catch (e) {
            return `Unable to load command ${commandName}: ${e}`;
          }
    }

    //Check to see if the user is in the database.
    client.checkUser = (userID,UserName,UserAvatar,callback) => {

      connection.query("SELECT COUNT(*) AS `count`, `UserAvatar` FROM `User` WHERE `User_ID`='"+userID+"'", function(error, results, fields) {
              if(results[0].count === 0) {
                  connection.query("INSERT INTO `User`(`User_ID`, `UserName`) VALUES ('"+userID+"', '"+UserName+"')",function(error, results, fields){
                      callback()
                  })
              }else{
                  if(results[0].UserAvatar != UserAvatar) {
                      connection.query("UPDATE `User` SET `UserAvatar` = '"+UserAvatar+"' WHERE `User_ID`='"+userID+"'",function(error, results, fields){})
              }
              callback()
  }
      }); 

};



//But is the guild in the db?
client.checkServer = (serverID, serverName, serverIcon, callback) => {

    connection.query("SELECT COUNT(*) AS `count`, `ServerIcon`,`ServerName` FROM `Servers` WHERE `ServerID` ='" + serverID + "'", function(error, results, ffields) {
        if (results[0].count === 0) {
            connection.query("INSERT INTO `Servers`(`ServerID`, `ServerName`) VALUES ('" + serverID + "', " + connection.escape(serverName) + ")", function(error, results, fields) {
                callback()
            })

        } else {
            if (results[0].ServerIcon != serverIcon) {
                connection.query("UPDATE `Servers` SET `ServerIcon` = '" + serverIcon + "' WHERE `ServerID` = '" + serverID + "'", function(error, results, fields) {})
            }
            if (results[0].ServerName != serverName) {
                connection.query("UPDATE `Servers` SET `ServerName` = " + connection.escape(serverName) + " WHERE `ServerID` = '" + serverID + "'", function(error, results, fields) {})
            }
            callback()
        }
    });
};



//Trust me you're gonna wanna add this.

client.setBackground = (id, username, avatar, background, amount, msg) => {
    client.checkUser(id, username, avatar, function() {
            connection.query("SELECT COUNT(*) AS hasB FROM `userB` WHERE `User_ID` = " + id + " AND `name` = '" + background + "'", function(err1, res1, fields1) {
                if (res1[0].hasB == 0) {
                    connection.query("SELECT *  FROM `User` WHERE `User_ID` = " + id + "", function(err, res, fields) {
                        if (res[0].Credits < amount) {
                            msg.channel.send("I'm sorry you don't have enough money for this background.")
                        } else {
                            connection.query("UPDATE `User` SET `background` = '" + background + "', `Credits`=`Credits` -"+ amount +" WHERE `User_ID` = " + id + "")
                            connection.query("INSERT INTO `userB` (`User_ID`, `name`) VALUES (" + id + ", '" + background + "')")
                            msg.channel.send("Successfully bought your background.")
                        }
                    })

                } else {
                    connection.query("UPDATE `User` SET `background` = '" + background + "' WHERE `User_ID` = " + id + "")
                   msg.channel.send("Successfully update your profile.")
                }
            })
        
    })

    
};

//This is the thing that makes you set the emblems and the stuff. Trust me you're gonna want this too
client.setEmblem = (id, username, avatar, emblem, amount, msg) => {
    client.checkUser(id, username, avatar, function() {
            connection.query("SELECT COUNT(*) AS hasB FROM `userE` WHERE `userID` = " + id + " AND `emblem` = '" + emblem + "'", function(err1, res1, fields1) {
                if (res1[0].hasB == 0) {
                    connection.query("SELECT *  FROM `User` WHERE `User_ID` = " + id + "", function(err, res, fields) {
                        if (res[0].Credits < amount) {
                            msg.channel.send("I'm sorry you don't have enough money for this emblem.")
                        } else {
                            connection.query("UPDATE `User` SET `emblem` = '" + emblem + "', `Credits`=`Credits` -"+ amount +" WHERE `User_ID` = " + id + "")
                            connection.query("INSERT INTO `userE` (`userID`, `emblem`) VALUES (" + id + ", '" + emblem + "')")
                            msg.channel.send("Successfully bought your emblem.")
                        }
                    })

                } else {
                    connection.query("UPDATE `User` SET `emblem` = '" + emblem + "' WHERE `User_ID` = " + id + "")
                   msg.channel.send("Successfully update your profile.")
                }
            })
        
    })

    
};
}