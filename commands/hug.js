exports.run = (client, message, args, Discord, connection) => {
  // Needs more hugs
  let hugsAnime = ['https://media.tenor.com/images/efdd8f53689b1bb3437054d608156e95/tenor.gif',
    'http://vignette2.wikia.nocookie.net/degrassi/images/d/df/ATTACK_HUG.gif',
    'https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif',
    'http://gifimage.net/wp-content/uploads/2017/06/anime-hug-gif-16.gif',
    'https://media.giphy.com/media/xJlOdEYy0r7ZS/giphy.gif',
    'https://media.giphy.com/media/DjczAlIcyK1Co/giphy.gif',
    'https://myanimelist.cdn-dena.com/s/common/uploaded_files/1460993069-9ac8eaae8cd4149af4510d0fed0796bf.gif',
    'https://media.tenor.com/images/4441c1824642f363ed1a3fae53df3b43/tenor.gif',
    'https://s-media-cache-ak0.pinimg.com/originals/c5/85/27/c58527caa736f8d5ce4ab6ee6e3f736b.gif',
    'https://media.tenor.com/images/365f34c638f5fcc6564bb2ead561ff5c/tenor.gif',
    'http://media.tumblr.com/2e21664bfe2ca4ed1d2c264993fd157c/tumblr_inline_ne6ecxnYy21rid3d5.gif',
    'https://media.tenor.com/images/e07a54a316ea6581329a7ccba23aea2f/tenor.gif',
    'https://media.tenor.com/images/00b03042f404a35fe210982961387d13/tenor.gif',
    'http://cdn.smosh.com/sites/default/files/ftpuploads/bloguploads/0413/epic-hugs-friends-anime.gif',
    'https://media.giphy.com/media/f5hhE6f3h8Vkk/giphy.gif',
    'https://media.tenor.com/images/4e258f5d8b171c304d65cd5c4a05112e/tenor.gif',
    'https://media.tenor.com/images/caeb72a8cd1e5e0fb072df71db450de8/tenor.gif',
    'https://media.giphy.com/media/C4gbG94zAjyYE/giphy.gif',
    'https://media.tenor.com/images/e154dc53a688bb57898dbb6e8b156b23/tenor.gif',
    'https://media.giphy.com/media/g02bLnr5XD4k/giphy.gif',
    'https://media.tenor.com/images/c841c6a0263e5ed16f66d2e8a3e7ab8c/tenor.gif',
    'https://31.media.tumblr.com/5e86bb5906d5d5603351e9dbea007dea/tumblr_inline_n998n40b2q1sx8vac.gif',
    'http://31.media.tumblr.com/9204649fd84d3df7223feb6712a89444/tumblr_n8pc8badUs1sg0ygjo1_250.gif',
    'http://gifimage.net/wp-content/uploads/2017/01/Anime-hug-GIF-Image-Download-24.gif',
    'http://cdn.smosh.com/sites/default/files/ftpuploads/bloguploads/0413/epic-hugs-friends-pikachu.gif',
    'http://33.media.tumblr.com/tumblr_lny2x0I2111qkaujc.gif',
    'http://s8.favim.com/orig/151210/anime-boy-couple-gif-Favim.com-3742798.gif',
    'https://media.tenor.com/images/c00119443474a031024af2e299947cb8/tenor.gif',
    'https://s-media-cache-ak0.pinimg.com/originals/02/5f/22/025f22b43d49114402fc335eca3bd2dc.gif',
    'https://31.media.tumblr.com/a03b9436c5e7fffb5b36f6f45f19b927/tumblr_inline_n0vjbkk07r1qdlvae.gif',
    'https://media.tenor.com/images/11889c4c994c0634cfcedc8adba9dd6c/tenor.gif',
    'https://media.giphy.com/media/P47pxJVTwIoJW/giphy.gif',
    'https://gifimage.net/wp-content/uploads/2017/07/anime-tackle-hug-gif-3.gif',
  ];

  let hugsReal = ['https://media1.tenor.com/images/022a19f8ad9260b5045e16289e66c903/tenor.gif',
    'http://cdn.smosh.com/sites/default/files/ftpuploads/bloguploads/0413/epic-hugs-cat-dot.gif',
    'https://media.giphy.com/media/QM6nfBpKUxgKA/giphy.gif',
    'http://gif-finder.com/wp-content/uploads/2016/10/Dog-thanks-cat-for-the-hug.gif',
    'https://media1.tenor.com/images/e8d40503289094b72a40ab9efbb804f0/tenor.gif',
    'https://vignette.wikia.nocookie.net/degrassi/images/2/24/Rachel_and_Monica_hug.gif',
    'https://vignette.wikia.nocookie.net/degrassi/images/d/d3/Slexie_hug.gif',
    'http://www.gifbin.com/bin/102011/1319566609_white_whale_gives_man_hug.gif',
    'https://78.media.tumblr.com/1b51df5c088c8fd2e2b7a6b656464efb/tumblr_n92973orMp1thzawco1_500.gif',
    'https://i0.wp.com/gifrific.com/wp-content/uploads/2013/01/Frodo-Hug-Samwise-Elijah-Wood-Sean-Astin.gif',
    'https://78.media.tumblr.com/6589b36f120ce40aab47508f3e64da2a/tumblr_inline_o30t6bWucg1rlkil0_540.gif',
    'https://media4.giphy.com/media/3o7TKu8D1d12Eo9wSQ/giphy.gif',
    'http://cdn1.clevver.com/wp-content/uploads/2012/12/new-years-resolutions-2013-family-1.gif',
    'https://i.imgur.com/lenljW6.gif'];


  let lols = ['https://data.whicdn.com/images/69819901/original.gif',
    'https://media1.tenor.com/images/112c2abcf585b37e6c6950ebc3ab4168/tenor.gif',
    'https://lh4.googleusercontent.com/-xxPcIb2lzAw/VIkdc2oRu7I/AAAAAAAAJrU/4bIJ8zJl9hE/w426-h239/Kill%2Bla%2Bkill%2B2.gif',
    'http://i0.kym-cdn.com/photos/images/original/000/906/455/51f.gif',
    'https://media.giphy.com/media/IFqVnhA55IUdG/giphy.gif',
    'http://mrwgifs.com/wp-content/uploads/2013/09/Awkward-Hug-Gif-In-Americas-Next-Top-Model.gif',
    'https://vignette.wikia.nocookie.net/teen-titans-go/images/4/49/No_Hugs.gif'];

  let wiggyID = '232614905533038593';

  let ppl = ['198589482058907649', '341032426799235072', '292526078331977728', '239110748180054017', '143109424045621250'];
  if (message.mentions.users.first()) {
    if (message.mentions.users.first().id === wiggyID && !ppl.includes(message.author.id)) {
      let hug = lols[Math.floor(Math.random() * lols.length)];
      message.channel.send(`${message.author} just tried to hug Lilwiggy. Yeah that didn't work.`, { file: hug });
    } else if (message.mentions.users.first().id === message.author.id) {
      message.channel.send("You can't hug yourself! That's just a bit weird.");
    } else if (message.mentions.users.first().bot) {
      message.channel.send("Silly you! Bots don't have emotions!");
    } else {
      client.checkUser(message.mentions.users.first().id, message.mentions.users.first().displayAvatarURL, () => {
        connection.query(`SELECT \`weeb\` FROM \`User\` WHERE \`User_ID\` = ${message.mentions.users.first().id}`, (err, res) => {
          if (err)
            throw err;
          if (res[0].weeb === 'on') {
            let hug = hugsAnime[Math.floor(Math.random() * hugsAnime.length)];
            message.channel.send(`${message.author} just gave ${message.mentions.users.first()} a hug!`, {
              file: hug,
            });
          } else {
            let hug = hugsReal[Math.floor(Math.random() * hugsReal.length)];
            message.channel.send(`${message.author} just gave ${message.mentions.users.first()} a hug!`, {
              file: hug,
            });
          }
        });
      });
    }
  } else {
    message.channel.send('Please mention a valid user.');
  }
};


exports.conf = {
  name: 'hug',
  description: 'Hug me pls',
  usage: 'hug',
  aliases: ['fuck'],
};
