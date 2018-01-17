// These are custom for 3 servers including my own. Please ignore it.
exports.run = (client, message, Discord, connection) => {
    if (message.guild.id === '265199259291222016' || message.guild.id === '303525154464727041' || message.guild.id === '309531752014151690') {
        const embed = new Discord.RichEmbed();
        embed.setThumbnail(message.author.avatarURL);
        embed.setColor('#89ff89');
        embed.setTitle(`Message sent by ${message.author.username} deleted in ${message.channel.name}.`);

        if (message.attachments.first()) {
            embed.addField('Image:', message.attachments.first().url);
        } else if (message.content.length > 0) {
            embed.addField('Message:', message.content);
        } else {
            embed.addField('Message:', 'Message was most likely an embed.');
        }
        embed.addField('Message ID:', message.id);

        message.guild.channels.find('name', 'mod-log').send({
            embed,
        });
    }
};
