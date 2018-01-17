// These are custom for 3 servers including my own. Please ignore it.
exports.run = (client, guild, user, Discord, connection) => {
    if (guild.id === '265199259291222016' || guild.id === '303525154464727041' || guild.id === '309531752014151690') {
        const embed = new Discord.RichEmbed()
        .setThumbnail(user.avatarURL)
        .setColor('#89ff89')
        .setTitle(`${user.username} was banned.`);

        guild.channels.find('name', 'mod-log').send({
            embed,
        });
    }
};
