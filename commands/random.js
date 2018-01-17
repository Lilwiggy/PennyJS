// Witty comment here
exports.run = (client, message, args, Discord) => {
    if (args[1]) {
        if (args[1] === 'avatar') {
            let hi = client.users.array();
            let usr = hi[`${Math.floor(Math.random() * client.users.size)}`];
            let embed = new Discord.RichEmbed();

            embed.setTitle(`Random avatar from ${usr.username}`);
            embed.setColor('#89ff89');

            if (usr.displayAvatarURL.includes('.gif')) {
                embed.setImage(usr.displayAvatarURL + '&.gif');
            } else {
                embed.setImage(usr.displayAvatarURL);
            }

            message.channel.send({embed});
        }
    }
};

exports.conf = {
    name: 'random',
    description: 'Get a random avatar',
    usage: 'random avatar',
    aliases: [],
};
