exports.run = function(client, message, args, Discord, connection) {
    //Please use this responsibly. Or don't, your choice. (I think I fixed the bugs)
    client.checkUser(message.author.id, message.author.displayAvatarURL, function() {
        connection.query("SELECT * FROM `User` WHERE `User_ID` = " + message.author.id + "", function(err, res, fields) {
            if (args.length == 1) {
                // Create a message collector
                if (res[0].Credits < 100) {
                    message.channel.send("I'm sorry but you do not have enough credits for this.")

                } else {
                    message.channel.send("Are you sure you want to gamble 100 credits?")
                    var collector = message.channel.createMessageCollector(
                        m => m.author.id === message.author.id, {
                            time: 10000,
                            max: 1
                        }
                    );
                    collector.on('collect', m => {
                        var mc = m.content.toLowerCase();
                        if (mc === "no") {
                            message.channel.send("Gamble canceled.")
                            collector.stop
                        } else if (mc === "yes") {
                            let decision = Math.floor(Math.random() * 11);

                            if (decision <= 7) {
                                message.channel.send("Sorry looks like you lost.")
                                connection.query("UPDATE `User` SET `Credits` = `Credits` - 100 WHERE `User_ID` = " + message.author.id + "")

                                collector.stop;
                            } else if (decision >= 8) {
                                message.channel.send("Congrats! You won!")
                                connection.query("UPDATE `User` SET `Credits` = `Credits` + 100 WHERE `User_ID` = " + message.author.id + "")
                                collector.stop;
                            }
                        }


                    });
                    collector.on('end', collected => {
                        if (collected.size === 0) {
                            message.channel.send("Gamble canceled.")
                        }
                    });

                }
            } else {
                if (isNaN(args[1])) {
                    message.channel.send("Please use numbers.")
                } else {
                    if (res[0].Credits < args[1]) {
                        message.channel.send("I'm sorry but you don't have enough credits for this.")
                    } else if (args[1].includes("-") || args[1].includes("+") || Math.round(args[1]) < 1) {
                        message.channel.send("You cheaky bugger you.")
                    } else {
                        // Create a message collector
                        message.channel.send(`Are you sure you want to gamble ${Math.round(args[1])} credits?`)
                        var collector = message.channel.createMessageCollector(
                            m => m.author.id === message.author.id, {
                                time: 10000,
                                max: 1
                            }
                        );
                        collector.on('collect', m => {
                            var mc = m.content.toLowerCase();
                            if (mc === "no") {
                                message.channel.send("Gamble canceled.")
                                collector.stop
                            } else if (mc === "yes") {
                                let decision = Math.floor(Math.random() * 11);

                                if (decision < 7 || decision == 7) {
                                    message.channel.send("Sorry looks like you lost.")
                                    connection.query("UPDATE `User` SET `Credits` = `Credits` - " + connection.escape(Math.round(args[1])) + " WHERE `User_ID` = " + message.author.id + "")
                                    collector.stop;
                                } else if (decision > 8) {
                                    message.channel.send("Congrats! You won!")
                                    connection.query("UPDATE `User` SET `Credits` = `Credits` + " + connection.escape(Math.round(args[1])) + " WHERE `User_ID` = " + message.author.id + "")
                                    collector.stop;
                                }
                            }


                        });
                        collector.on('end', collected => {
                            if (collected.size === 0) {
                                message.channel.send("Gamble canceled.")
                            }
                        });

                    }
                }
            }
        })

    })
}


exports.conf = {
    name: "gamble",
    description: "Ganble your life away",
    usage: "gamble",
    aliases: []
}