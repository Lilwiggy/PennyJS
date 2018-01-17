// So uh, this is the guts of the profile command, it's very, uh, messy, best to ignore it.
const Jimp = require('jimp');
const config = require('./config.json');

exports.pro = (client, id, username, avatar, message, connection, Discord, discriminator) => {
    client.checkUser(id, avatar, () => {
        connection.query("SELECT * FROM `User` WHERE `User_ID` = '" + id + "'", (err, results, fields) => {
            if (err) {
                throw new Error(err);
            }
            let xp = results[0].XP; // Why is this here again?

            message.channel.startTyping();

            Jimp.read(`./backgrounds/temp.png`, (error, res) => {
                if (error) {
                    throw new Error(error);
                }
                res.resize(632, 600);

                Jimp.read('./backgrounds/outline.png', (err, img2) => {
                    if (err) {
                        throw new Error(err);
                    }
                    Jimp.read(avatar, (err, img) => {
                        if (err) {
                            throw new Error(err);
                        } else if (results[0].background.length > 0) {
                            Jimp.read(`./backgrounds/${results[0].background}.png`, (err, img1) => {
                                if (err) {
                                    throw new Error(err);
                                }

                                img1.resize(630, 340);
                                res.composite(img1, 1, 1);
                            });
                        }
                        Jimp.read(`./emblems/patron.png`, function (e, img3) {
                            if (e) {
                                throw new Error(e);
                            }
                            Jimp.read(`./emblems/ban.png`, function (error, ham) {
                                if (error) {
                                    throw new Error(error);
                                }
                                Jimp.read(`./emblems/dev.png`, function (error, dev) {
                                    if (error) {
                                        throw new Error(error);
                                    } else if (results[0].emblem.length > 0) {
                                        Jimp.read(`./emblems/${results[0].emblem}.png`, (error, em) => {
                                            if (error) {
                                                throw new Error(error);
                                            }

                                            em.resize(100, 100);
                                            res.composite(em, 500, 450);
                                        });
                                    }

                                    img.resize(180, 180);
                                    img2.resize(210, 210)
                                    .quality(100);
                                    img3.resize(100, 100);
                                    ham.resize(100, 100);
                                    dev.resize(100, 100);
                                    ham.flip(true, false);
                                    res.composite(img2, 25, 24);
                                    res.composite(img, 42, 39);

                                    if (results[0].patron === 1) {
                                        res.composite(img3, 500, 350);
                                    }
                                    if (config.mods.id.includes(id)) {
                                        res.composite(ham, 400, 450);
                                    }
                                    if (id === '232614905533038593') {
                                        res.composite(dev, 400, 345);
                                    }

                                    Jimp.loadFont('./fonts/hi.fnt').then((font) => {
                                        res.print(font, 50, 520, `XP: ${xp} / ${results[0].Next}`);
                                        res.print(font, 50, 470, `Level: ${results[0].Level}`);
                                        res.print(font, 50, 420, `Credits: ${results[0].Credits}`);
                                        res.print(font, 50, 370, `Cookies: ${results[0].Cookie}`);
                                        res.print(font, 25, 240, `${username}#${discriminator}`);

                                        res.getBuffer(Jimp.MIME_PNG, (err, pl) => {
                                            if (err) {
                                                throw new Error(err);
                                            }

                                            let pro = new Discord.Attachment()
                                            .setAttachment(pl, `${id}.png`);

                                            message.channel.send(`Profile card for **${username}**`, {
                                                file: pro,
                                            }).then(message.channel.stopTyping());
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};
// I call this the wall that surrounds Mexico
