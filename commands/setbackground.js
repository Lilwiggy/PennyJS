// Background thingies! (needs more)
exports.run = (client, message, args, Discord, connection) => {
    if (args.length === 1) {
        message.channel.send('Usage: //setbackground [background]\nBackground options are here: https://pennybot.tk/backgrounds or by doing //shopinfo backgrounds');
    } else {
        if (args[1].toLowerCase() === 'adam') {
            client.setBackground(message.author.id, message.author.avatarURL, 'adam', 500, message);
        } else if (args[1].toLowerCase() === 'glynda') {
            client.setBackground(message.author.id, message.author.avatarURL, 'glynda', 1000, message);
        } else if (args[1].toLowerCase() === 'mercury') {
            client.setBackground(message.author.id, message.author.avatarURL, 'mercury', 1000, message);
        } else if (args[1].toLowerCase() === 'midna') {
            client.setBackground(message.author.id, message.author.avatarURL, 'midna', 1000, message);
        } else if (args[1].toLowerCase() === 'ironwood') {
            client.setBackground(message.author.id, message.author.avatarURL, 'ironwood', 1000, message);
        } else if (args[1].toLowerCase() === 'ren') {
            client.setBackground(message.author.id, message.author.avatarURL, 'ren', 2000, message);
        } else if (args[1].toLowerCase() === 'raven') {
            client.setBackground(message.author.id, message.author.avatarURL, 'raven', 2000, message);
        } else if (args[1].toLowerCase() === 'ruby') {
            client.setBackground(message.author.id, message.author.avatarURL, 'ruby', 2000, message);
        } else if (args[1].toLowerCase() === 'weiss') {
            client.setBackground(message.author.id, message.author.avatarURL, 'weiss', 2000, message);
        } else if (args[1].toLowerCase() === 'yang') {
            client.setBackground(message.author.id, message.author.avatarURL, 'yang', 2000, message);
        } else if (args[1].toLowerCase() === 'blake') {
            client.setBackground(message.author.id, message.author.avatarURL, 'blake', 2000, message);
        } else if (args[1].toLowerCase() === 'jaune') {
            client.setBackground(message.author.id, message.author.avatarURL, 'jaune', 2000, message);
        } else if (args[1].toLowerCase() === 'cinder') {
            client.setBackground(message.author.id, message.author.avatarURL, 'cinder', 2000, message);
        } else if (args[1].toLowerCase() === 'emerald') {
            client.setBackground(message.author.id, message.author.avatarURL, 'emerald', 2000, message);
        } else if (args[1].toLowerCase() === 'velvet') {
            client.setBackground(message.author.id, message.author.avatarURL, 'velvet', 2000, message);
        } else if (args[1].toLowerCase() === 'pyrrha') {
            client.setBackground(message.author.id, message.author.avatarURL, 'pyrrha', 2000, message);
        } else if (args[1].toLowerCase() === 'roman') {
            client.setBackground(message.author.id, message.author.avatarURL, 'roman', 2000, message);
        } else if (args[1].toLowerCase() === 'yatsu') {
            client.setBackground(message.author.id, message.author.avatarURL, 'yatsu', 3000, message);
        } else if (args[1].toLowerCase() === 'neo') {
            client.setBackground(message.author.id, message.author.avatarURL, 'neo', 3000, message);
        } else if (args[1].toLowerCase() === 'penny') {
            client.setBackground(message.author.id, message.author.avatarURL, 'penny', 3000, message);
        } else if (args[1].toLowerCase() === 'zwei') {
            client.setBackground(message.author.id, message.author.avatarURL, 'zwei', 3000, message);
        } else if (args[1].toLowerCase() === 'qrow') {
            client.setBackground(message.author.id, message.author.avatarURL, 'qrow', 4000, message);
        } else if (args[1].toLowerCase() === 'nora') {
            client.setBackground(message.author.id, message.author.avatarURL, 'nora', 4000, message);
        } else if (args[1].toLowerCase() === 'ozpin') {
            client.setBackground(message.author.id, message.author.avatarURL, 'ozpin', 4000, message);
        } else if (args[1].toLowerCase() === 'kyoko') {
            client.setBackground(message.author.id, message.author.avatarURL, 'kyoko', 2000, message);
        } else if (args[1].toLowerCase() === 'hina') {
            client.setBackground(message.author.id, message.author.avatarURL, 'hina', 2000, message);
        } else if (args[1].toLowerCase() === 'monokuma') {
            client.setBackground(message.author.id, message.author.avatarURL, 'monokuma', 5000, message);
        } else if (args[1].toLowerCase() === 'patreon') {
            connection.query('SELECT * FROM `User` WHERE `User_ID` = ' + message.author.id + '', (err, res, fields) => {
                if (err) {
                    throw new Error(err);
                } else if (res[0].patron === 1) {
                    client.setBackground(message.author.id, message.author.avatarURL, 'patreon', 0, message);
                } else {
                    message.channel.send('This background is for Patreons only.');
                }
            });
        } else if (args[1].toLowerCase() === 'ibuki') {
            client.setBackground(message.author.id, message.author.avatarURL, 'ibuki', 4000, message);
        } else if (args[1].toLowerCase() === 'chiaki') {
            client.setBackground(message.author.id, message.author.avatarURL, 'chiaki', 5000, message); // LOVE ME NANAMI!!!!!!!!!!!!!!
        } else if (args[1].toLowerCase() === 'junko') {
            client.setBackground(message.author.id, message.author.avatarURL, 'junko', 4000, message); // "Cover photos and junk" - Junko.     Ha, ironic.
        } else if (args[1].toLowerCase() === 'earthchan') {
            client.setBackground(message.author.id, message.author.avatarURL, 'earthchan', 5, message);
        } else if (args[1].toLowerCase() === 'celeste') {
            client.setBackground(message.author.id, message.author.avatarURL, 'celeste', 3000, message);
        } else if (args[1].toLowerCase() === 'chihiro') {
            client.setBackground(message.author.id, message.author.avatarURL, 'chihiro', 4000, message); // Inspiration much?????????????
        } else if (args[1].toLowerCase() === 'gundham') {
            client.setBackground(message.author.id, message.author.avatarURL, 'gundham', 5000, message); // This too must be the will of causality...
        } else if (args[1].toLowerCase() === 'hajime') {
            client.setBackground(message.author.id, message.author.avatarURL, 'hajime', 5000, message);
        } else if (args[1].toLowerCase() === 'kokich') {
            client.setBackground(message.author.id, message.author.avatarURL, 'kokichi', 5000, message); // I have no words for you....
        } else if (args[1].toLowerCase() === 'leon') {
            client.setBackground(message.author.id, message.author.avatarURL, 'leon', 3000, message);
        } else if (args[1].toLowerCase() === 'sayaka') {
            client.setBackground(message.author.id, message.author.avatarURL, 'sayaka', 7000, message); // <33333333333333333
        } else if (args[1].toLowerCase() === 'makoto') {
            client.setBackground(message.author.id, message.author.avatarURL, 'maktoto', 6000, message);
        } else if (args[1].toLowerCase() === 'nagito') {
            client.setBackground(message.author.id, message.author.avatarURL, 'nagito', 5000, message); // No. Just. No. GTFO KOMAEDA!
        } else if (args[1].toLowerCase() === 'sakura') {
            client.setBackground(message.author.id, message.author.avatarURL, 'sakura', 8000, message); // You may not like it but this is the ideal female body type.
        } else if (args[1].toLowerCase() === 'sonia') {
            client.setBackground(message.author.id, message.author.avatarURL, 'sonia', 6000, message);
        } else if (args[1].toLowerCase() === 'taka') {
            client.setBackground(message.author.id, message.author.avatarURL, 'taka', 6000, message); // THIS WALLPAPER IS WELCOME IN MY PANT'S ENVIRONMENT
        } else if (args[1].toLowerCase() === 'toko') {
            client.setBackground(message.author.id, message.author.avatarURL, 'toko', 6000, message); // B-BAKA!
        } else if (args[1].toLowerCase() === 'aang') {
            client.setBackground(message.author.id, message.author.avatarURL, 'aang', 5000, message); // #Throwback
        } else if (args[1].toLowerCase() === 'dude') {
            client.setBackground(message.author.id, message.author.avatarURL, 'dude', 10000, message);
        } else if (args[1].toLowerCase() === 'appa') {
            client.setBackground(message.author.id, message.author.avatarURL, 'appa', 10000, message);
        } else {
            message.channel.send('Background options can be found here: https://pennybot.tk/backgrounds or by doing //shopinfo backgrounds');
        }
    }
};

exports.conf = {
    name: 'setbackground',
    description: 'Set this to be kids with the hip',
    usage: 'setbackground',
    aliases: [],
};
