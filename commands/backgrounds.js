// The most useless command here. Carry on.

exports.run = (client, msg) => {
    msg.channel.send(`View your profile here: https://pennybot.tk/me?userID=${msg.author.id}`);
};

exports.conf = {
    name: 'backgrounds',
    category: 'Miscelaneous',
    description: 'View your backgrounds',
    usage: 'background',
    aliases: [],
};
