// Astro cocks
exports.run = (client, message, args, Discord) => {
    let hi = Math.floor(Math.random() * 24);
    let embed = new Discord.RichEmbed()
    .setTitle("Here's your official Spacehuhn meme:tm:")
    .setImage(`https://spacehuhn.de/img/gallery/${hi}.jpg`)
    .setColor('#00b0ff');

    message.channel.send({embed});
};

exports.conf = {
    name: 'spacehuhn',
    description: '<3',
    usage: 'spacehuhn',
    aliases: ['chicken', 'stef'],
};
