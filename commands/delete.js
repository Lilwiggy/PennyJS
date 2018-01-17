// Delet this (I think this command has bugs?) Honestly this code sucks. Not
// even gonna lie it's terrible, I was following a tutorial at the time, I
// didn't know how to code okay?
exports.run = (client, message, args, Discord, connection) => {
    if (message.member.hasPermission('MANAGE_MESSAGES')) {
        if (args.length === 1) {
            message.channel.send('Usage: //delete [amount]');
        } else {
            let del;

            if (args.length === 1) {
                del = 2;
            } else {
                del = parseInt(args[1]);
            }

            // Please be using numbes...
            if (!isNaN(args[1])) {
                if (args[1] > 100) {
                    message.channel.send('Max amount is 100.');
                } else {
                    message.delete().then(
                        message.channel.fetchMessages({
                            limit: del,
                        }).then(messages => message.channel.bulkDelete(messages)).catch(console.error),
                    );

                    message.channel.send(`Deleted ${args[1]} messages. `);
                }
            } else {
                message.channel.send('Please use numbers. (Max 100)');
            }
        }
    } else {
        message.channel.send('This command is restricted to server mods.');
    }
};

exports.conf = {
    name: 'delete',
    category: 'Miscelaneous',
    description: 'Delet pls',
    usage: 'delete',
    aliases: [],
};
