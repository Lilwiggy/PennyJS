module.exports = (client, connection) => {
  // Super secret spy stuff that I took "inspiration" from An Idiot's guide for. It just loads commands and stuff, I made it a little different. DON'T SHAME ME!
  client.loadCommand = (commandName) => {
    try {
      const props = require(`../commands/${commandName}`);
      if (props.init)
        props.init(client);

      client.commands.set(props.conf.name, props);
      props.conf.aliases.forEach((alias) => {
        client.aliases.set(alias, props.conf.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };

  // Check to see if the user is in the database.
  client.checkUser = (userID, UserAvatar, callback) => {
    connection.query(`SELECT COUNT(*) AS \`count\`, \`UserAvatar\` FROM \`User\` WHERE \`User_ID\`='${userID}'`, (error, results) => {
      if (results[0].count === 0) {
        connection.query(`INSERT INTO \`User\`(\`User_ID\`) VALUES ('${userID}')`, (err, res) => {
          if (err)
            throw err;
          callback();
        });
      } else {
        if (results[0].UserAvatar !== UserAvatar)
          connection.query(`UPDATE \`User\` SET \`UserAvatar\` = '${UserAvatar}' WHERE \`User_ID\`='${userID}'`, (err1, res1) => {});
        callback();
      }
    });
  };


  // But is the guild in the db?
  client.checkServer = (serverID, serverName, serverIcon, callback) => {
    connection.query(`SELECT COUNT(*) AS \`count\`, \`ServerIcon\`,\`ServerName\` FROM \`Servers\` WHERE \`ServerID\` ='${serverID}'`, (error, results, ffields) => {
      if (results[0].count === 0) {
        connection.query(`INSERT INTO \`Servers\`(\`ServerID\`, \`ServerName\`) VALUES ('${serverID}', ${connection.escape(serverName)})`, (error, results, fields) => {
          callback();
        });
      } else {
        if (results[0].ServerIcon !== serverIcon)
          connection.query(`UPDATE \`Servers\` SET \`ServerIcon\` = '${serverIcon}' WHERE \`ServerID\` = '${serverID}'`, (error, results, fields) => {});

        if (results[0].ServerName !== serverName)
          connection.query(`UPDATE \`Servers\` SET \`ServerName\` = ${connection.escape(serverName)} WHERE \`ServerID\` = '${serverID}'`, (error, results, fields) => {});

        callback();
      }
    });
  };


  // Trust me you're gonna wanna add this.

  client.setBackground = (id, avatar, background, amount, msg) => {
    client.checkUser(id, avatar, () => {
      connection.query(`SELECT COUNT(*) AS hasB FROM \`userB\` WHERE \`User_ID\` = ${id} AND \`name\` = '${background}'`, (err1, res1, fields1) => {
        if (res1[0].hasB === 0) {
          connection.query(`SELECT *  FROM \`User\` WHERE \`User_ID\` = ${id}`, (err, res, fields) => {
            if (err)
              throw err;
            if (res[0].Credits < amount) {
              msg.channel.send("I'm sorry you don't have enough money for this background.");
            } else {
              connection.query(`UPDATE \`User\` SET \`background\` = '${background}', \`Credits\`=\`Credits\` -${amount} WHERE \`User_ID\` = ${id}`);
              connection.query(`INSERT INTO \`userB\` (\`User_ID\`, \`name\`) VALUES (${id}, '${background}')`);
              msg.channel.send('Successfully bought your background.');
            }
          });
        } else {
          connection.query(`UPDATE \`User\` SET \`background\` = '${background}' WHERE \`User_ID\` = ${id}`);
          msg.channel.send('Successfully updated your profile.');
        }
      });
    });
  };

  // This is the thing that makes you set the emblems and the stuff. Trust me you're gonna want this too
  client.setEmblem = (id, avatar, emblem, amount, msg) => {
    client.checkUser(id, avatar, () => {
      connection.query(`SELECT COUNT(*) AS hasB FROM \`userE\` WHERE \`userID\` = ${id} AND \`emblem\` = '${emblem}'`, (err1, res1, fields1) => {
        if (res1[0].hasB == 0) {
          connection.query(`SELECT *  FROM \`User\` WHERE \`User_ID\` = ${id}`, (err, res, fields) => {
            if (err)
              throw err;
            if (res[0].Credits < amount) {
              msg.channel.send("I'm sorry you don't have enough money for this emblem.");
            } else {
              connection.query(`UPDATE \`User\` SET \`emblem\` = '${emblem}', \`Credits\`=\`Credits\` -${amount} WHERE \`User_ID\` = ${id}`);
              connection.query(`INSERT INTO \`userE\` (\`userID\`, \`emblem\`) VALUES (${id}, '${emblem}')`);
              msg.channel.send('Successfully bought your emblem.');
            }
          });
        } else {
          connection.query(`UPDATE \`User\` SET \`emblem\` = '${emblem}' WHERE \`User_ID\` = ${id}`);
          msg.channel.send('Successfully updated your profile.');
        }
      });
    });
  };
}
;
