// Disable this stuff cause it gets annoying
exports.run = (client, message, args, Discord, connection) => {
    // I only check for my ID here because a few servers make me disable things.
    if (message.member.hasPermission('ADMINISTRATOR') || message.author.id === '232614905533038593') {
        if (args.length < 2) {
            message.channel.send('Usage: //disable [thing to disable]');
        } else if (args[1] === 'levels') {
            client.checkServer(message.guild.id, message.guild.name, message.guild.iconURL, () => {
                connection.query('UPDATE `Servers` SET `levels` = 0 WHERE `ServerID` = ' + message.guild.id + '');

                message.channel.send('Successfully disabled levels.');
                console.log('Did it!');
            });
        }
    } else {
        message.channel.send('This command is restricted to server admins.');
    }
};

exports.conf = {
    name: 'disable',
    description: 'Disables things n shiz',
    aliases: [],
};
