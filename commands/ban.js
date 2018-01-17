exports.run = (client, message, args, Discord, connection) => {
    // This command is for when users are being naughty and need a good ol' ban
    // hammer TO THE FACE! (Yes I am aware of a few bugs in this command
    if (message.member.hasPermission('BAN_MEMBERS')) {
        if (args.length === 1) {
            message.channel.send('Usage: //ban @user');
        } else {
            if (message.mentions.users.first()) {
                let Kickee = message.mentions.users.first().username;

                message.guild.member(message.mentions.users.first()).ban();
                message.channel.send(`**${Kickee}** was just banned.`, {
                    file: 'https://i.makeagif.com/media/6-01-2015/yeWyfV.gif',
                });
            } else {
                message.channel.send('Please mention a valid user.');
            }
        }
    } else {
        message.channel.send('This command is restricted to server mods.');
    }
};

exports.conf = {
    name: 'ban',
    category: 'Miscelaneous',
    description: 'Ban the user IN THE FACE!',
    usage: 'ban',
    aliases: [],
};
