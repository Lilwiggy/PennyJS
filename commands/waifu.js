// This command is best girl. Just sayin'
exports.run = (client, message, args, Discord, connection) => {
    let fs = require('fs');
    fs.readFile('waifu.txt', 'utf8', (err, data) => {
        if (err) {
            throw new Error(err);
        }

        // Please note this function does not mean I am splitting up with said wiafu but mere splitting the data so the bot can read it better.
        let responses = data.split(' | ');
        let response = responses[Math.floor(Math.random() * responses.length)];

        let embed = new Discord.RichEmbed()
        .setColor('#89ff89')
        .setTitle('I approve.')
        .setImage(response);

        message.channel.send({embed});
    });
};

exports.conf = {
    name: 'waifu',
    category: 'UHM BEST COMMAND EVER', // ON THE REAL THO
    description: 'SERIOSULY THO THE BEST',
    usage: 'waifu',
    aliases: [],
};
