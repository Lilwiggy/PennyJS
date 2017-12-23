exports.run = function (client, message,args, Discord, connection){
//Honestly this isn't even secret anymore

//The dankest of wiggy memes
var memes = ["http://i.imgur.com/HdwbVA9.jpg",
            "http://i.imgur.com/nAjwnFQ.jpg",
            "http://i.imgur.com/fh6IqOe.jpg",
            "http://i.imgur.com/aeZSz5C.jpg",
            "http://i.imgur.com/uUDfWeZ.jpg",
            "http://i.imgur.com/quxBjiS.jpg",
            "http://i.imgur.com/dRoi2hf.jpg",
            "http://i.imgur.com/OEBFReP.jpg",
            "http://i.imgur.com/FT9ot5E.jpg",
            "http://i.imgur.com/0VxD026.jpg",
            "http://i.imgur.com/OqzK315.jpg",
            "http://i.imgur.com/c9VrMzD.jpg",
            "http://i.imgur.com/G50bzn3.jpg",
            "http://i.imgur.com/w7nQaTE.jpg",
            "http://i.imgur.com/fUaCONV.jpg",
            "http://i.imgur.com/3u2zeRU.jpg",
            "http://i.imgur.com/i1UKCZJ.png",
            "http://i.imgur.com/lQLjqWV.png",
            "https://cdn.discordapp.com/attachments/278836520121532416/378919972992319491/unknown.png",
            "https://cdn.discordapp.com/attachments/222209999676506112/368983255879385099/woggeronero.png"
        ]
        var meme = memes[Math.floor(Math.random() * memes.length)];

        message.channel.send("Here's your Wiggy Meme™", {file: meme});
}

exports.conf = {
    name: "wiggy",
    category: "Miscelaneous",
    description: "Wig wam slam and jam",
    usage: "wiggy",
    aliases: []
}