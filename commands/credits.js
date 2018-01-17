// *peaks over shoulder at atm*
exports.run = (client, message, args, Discord, connection) => {
    if (args.length === 1) {
        client.checkUser(message.author.id, message.author.avatarURL, () => {
            connection.query("SELECT Credits FROM User WHERE User_ID='" + message.author.id + "'", (error, results, fields) => {
                if (error) {
                    throw new Error(error);
                }

                message.channel.send(`💰 You have ${results[0].Credits} credits. 💰`);
            });
        });
    } else {
        if (message.mentions.users.first()) {
            if (message.mentions.users.first().bot) {
                message.channel.send("Bots don't have money silly!");
            } else {
                client.checkUser(message.mentions.users.first().id, message.mentions.users.first().avatarURL, () => {
                    connection.query("SELECT Credits FROM User WHERE User_ID='" + message.mentions.users.first().id + "'", (error, results, fields) => {
                        if (error) {
                            throw new Error(error);
                        }

                        message.channel.send(`💰 ${message.mentions.users.first().username} has ${results[0].Credits} credits. 💰`);
                    });
                });
            }
        } else {
            message.channel.send('Please mention a valid user.');
        }
    }
};

exports.conf = {
    name: 'credits',
    description: 'How much coin?',
    usage: 'credits',
    aliases: [],
};
