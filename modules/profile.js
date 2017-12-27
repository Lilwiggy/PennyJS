exports.pro = function profile(client, id, username, avatar, message, connection, Discord, discriminator) {
    //So uh, this is the guts of the profile command, it's very, uh, messy, best to ignore it.
    const Jimp = require("../node_modules/jimp")
    const config = require("./config.json")
    client.checkUser(id, avatar, function() {
        connection.query("SELECT * FROM `User` WHERE `User_ID` = '" + id + "'", function(err, results, fields) {
            var xp = results[0].XP; //Why is this here again?
            message.channel.startTyping()
            Jimp.read(`./backgrounds/temp.png`, function(error, res) {
                res.resize(632, 600)
                Jimp.read("./backgrounds/outline.png", function(err, img2) {
                    Jimp.read(avatar, function(err, img) {
                        if (err) throw err;
                        if (results[0].background.length > 0) {
                            Jimp.read(`./backgrounds/${results[0].background}.png`, function(err, img1) {
                                img1.resize(630, 340)
                                res.composite(img1, 1, 1)
                            })
                        }
                        Jimp.read(`./emblems/patron.png`, function(e, img3) {
                            Jimp.read(`./emblems/ban.png`, function(error, ham) {
                                Jimp.read(`./emblems/dev.png`, function(error, dev) {
                                    if (results[0].emblem.length > 0) {
                                        Jimp.read(`./emblems/${results[0].emblem}.png`, function(error, em) {
                                            em.resize(100, 100)
                                            res.composite(em, 500, 450)
                                        })
                                    }
                                    img.resize(180, 180)
                                    img2.resize(210, 210)
                                        .quality(100)
                                    img3.resize(100, 100)
                                    ham.resize(100, 100)
                                    dev.resize(100, 100)
                                    ham.flip(true, false)
                                    res.composite(img2, 25, 24)
                                    res.composite(img, 42, 39)
                                    if (results[0].patron === 1) {
                                        res.composite(img3, 500, 350)
                                    }
                                    if (config.mods.id.includes(id)) {
                                        res.composite(ham, 400, 450)
                                    }
                                    if (id === "232614905533038593") {
                                        res.composite(dev, 400, 345)
                                    }
                                    Jimp.loadFont("./fonts/hi.fnt").then(function(font) {
                                        res.print(font, 50, 520, `XP: ${xp} / ${results[0].Next}`)
                                        res.print(font, 50, 470, `Level: ${results[0].Level}`)
                                        res.print(font, 50, 420, `Credits: ${results[0].Credits}`)
                                        res.print(font, 50, 370, `Cookies: ${results[0].Cookie}`)
                                        res.print(font, 25, 240, `${username}#${discriminator}`)

                                        res.getBuffer(Jimp.MIME_PNG, function(err, pl) {
                                            var pro = new Discord.Attachment()
                                                .setAttachment(pl, `${id}.png`)
                                            message.channel.send(`Profile card for **${username}**`, {
                                                file: pro
                                            }).then(message.channel.stopTyping())
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
//I call this the wall that surrounds Mexico