// Should I stay or should I g- oh they left already...
exports.run = (client, member, Discord, connection) => {
    let guild = member.guild;
    client.checkServer(guild.id, guild.name, guild.iconURL, () => {
        connection.query("SELECT * FROM `Servers` WHERE `ServerID` = '" + guild.id + "'", (error, results, fields) => {
            if (error) {
                throw new Error(error);
            }
            if (results[0].Welcome !== 0) {
                const channel = member.guild.channels.get(results[0].wc);
                if (channel) {
                    channel.send(`**${member.user.username}** just left **${guild.name}**. ${results[0].LMessage}`);
                }
            }
        });
    });
};
