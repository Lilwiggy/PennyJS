exports.run = (client, message, args, Discord) => {
    // Fun fact: I was retarded before and forgot that I could get the avatar
    // from the user object and made an extra API request to make myself feel
    // special. Good times.
    if (args.length === 1) {
        let embed = new Discord.RichEmbed();
        embed.setTitle(`Your avatar`);
        if (message.author.displayAvatarURL.includes('.gif')) {
            embed.setImage(message.author.displayAvatarURL + '&.gif');
        } else {
            embed.setImage(message.author.displayAvatarURL);
        }

        message.channel.send(embed);
    } else if (message.mentions.users.first()) {
        let embed = new Discord.RichEmbed();
        embed.setTitle(`${message.mentions.users.first().username}'s avatar`);

        if (message.mentions.users.first().displayAvatarURL.includes('.gif')) {
            embed.setImage(message.mentions.users.first().displayAvatarURL + '&.gif');
        } else {
            embed.setImage(message.mentions.users.first().displayAvatarURL);
        }

        message.channel.send(embed);
    } else {
        let user;
        try {
            user = client.users.find('username', message.content.substring(client.prefix.length + 7));
        } catch (e) {
            return message.channel.send("I'm sorry, but I could not find that user.");
        }

        let embed = new Discord.RichEmbed();
        embed.setTitle(`${message.content.substring(client.prefix.length + 7)}'s avatar`);

        if (user.displayAvatarURL.includes('.gif')) {
            embed.setImage(user.displayAvatarURL + '&.gif');
        } else {
            embed.setImage(user.displayAvatarURL);
        }

        message.channel.send(embed);
    }
};

exports.conf = {
    name: 'avatar',
    description: 'Yip yip?',
    usage: 'avatar',
    aliases: [],
};
