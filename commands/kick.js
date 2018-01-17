// This command is used when a user needs a good ol' kick in the butt. (Yes I am aware of a few bugs within this command.)
exports.run = (client, message, args, Discord, connection) => {
    if (message.member.hasPermission('KICK_MEMBERS')) {
        if (args.length === 1) {
            message.channel.send('Usage: //kick @user');
        } else {
            if (message.mentions.users.first()) {
                if (message.mentions.users.first().id === '309531399789215744') {
                    message.channel.send("I'm sorry, but I can't let you do that."); // Damn straight.
                } else {
                    let Kickee = message.mentions.users.first().username;

                    message.guild.member(message.mentions.users.first()).kick();
                    message.channel.send(`**${Kickee}** was just kicked.`, {
                        file: 'https://i.pinimg.com/originals/43/e1/a8/43e1a899c855ed93f3d5df5aae2a5fb0.gif',
                    });
                }
            } else {
                message.channel.send('Please mention a valid user.');
            }
        }
    } else {
        message.channel.send('This command is restricted to server mods.');
    }
};

exports.conf = {
    name: 'kick',
    category: 'Miscelaneous',
    description: 'Kick a user in the bum',
    usage: 'kick',
    aliases: [],
};
