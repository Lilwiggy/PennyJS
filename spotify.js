const Eris = require(`eris`);
const config = require(`./modules/config.json`);
const client = new Eris(config.bot.token);
// Side note, windows messed up my linter so I can't get it to work.
let search = require('youtube-search');
 
let opts = {
  maxResults: 10,
  key: config.youtube.key,
};
 
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: config.sql.host,
  user: config.sql.username,
  password: config.sql.password,
  database: config.sql.db_name,
});

require('./modules/functions.js')(client, connection);
client.on('ready', () => {
  console.log(`Eris commands running.`);
});



client.on(`messageCreate`, (message) => {
  if (message.author.bot)
    return;
  if (message.channel.type !== 0)
    return;
    client.checkServer(message.member.guild.id, message.member.guild.name, message.member.guild.iconURL, () => {
        connection.query(`SELECT * FROM \`Servers\` WHERE \`ServerID\` = '${message.member.guild.id}'`, (error, prefixD) => {
            let prefix = prefixD[0].Prefix;
  let msg = message.content.toLowerCase();
  let args = msg.split(' ');
  if (msg.startsWith(`${prefix}listening`)) {
    let member = args[1] ? message.member.guild.members.find((u) => u.username.toLowerCase() === args[1]) : message.member;
    if (!member) {
      message.channel.createMessage(`I cannot find that user.`);
    } else {
    let pre = member.game;

    if (!pre || pre.type !== 2) {
      message.channel.createMessage(`You aren't listening to anything.`);
    } else {
      let album = [];
      let artist = [];
      let listening = [];
      let users = message.member.guild.members.filter((m) => {
        if (m.bot)
          return;
        if (m.id === member.id)
          return;
        if (m.game && m.game.type === 2 && m.game.name === 'Spotify') {
          if (m.game.details === pre.details) {
            listening.push(m);
            return m.game.details === pre.details;
          } else if (m.game.assets.large_text === pre.assets.large_text) {
            album.push(m);
            return m.game.assets.large_text === pre.assets.large_text;
          } else if (m.game.state === pre.state) {
            artist.push(m);
            return m.game.state === pre.state;
          }
        }
      });
      let embed = {
        title: pre.details,
        thumbnail: {
          url: `https://i.scdn.co/image/${pre.assets.large_image.substr(8)}`,
        },
        color: 2021216,
        description: `By: ${pre.state}\nAlbum: ${pre.assets.large_text}`,
        fields: [
        ],
      };
      if (users.length > 0) {
        let listeners = [];
        let albums = [];
        let artists = [];
        users.forEach((u) => {
            if (listening.includes(u))
                listeners.push(u.user.username);
            else if (album.includes(u))
                albums.push(u.user.username);
            else if (artist.includes(u))
                artists.push(u.user.username);
        });

        if (listening.length > 0) {
          if (listening.length === 1)
          embed.fields.push({ name: `Listening with ${listening.length} other.`, value: listeners.toString() });
          else
          embed.fields.push({ name: `Listening with ${listening.length} others.`, value: listeners.toString() });
        } else if (album.length > 0) {
            if (album.length > 1)
              embed.fields.push({ name: `${album.length} others are listening to this album.`, value: albums.join(', ').toString() });
            else
              embed.fields.push({ name: `${album.length} other is listening to this album.`, value: albums.toString() });
          }
           if (artist.length > 0) {
          if (artist.length === 1)
            embed.fields.push({ name: `${artist.length} other is listening to this artist.`, value: artists.toString() });
          else
            embed.fields.push({ name: `${artist.length} others are listening to this artist.`, value: artists.join(', ').toString() });
        }
      }

      message.channel.createMessage({ embed: embed });
    }
  }
}

  if (msg === `${prefix}spyt`) {
    if (message.member.game && message.member.game.type === 2) {
    search(`${message.member.game.details} by ${message.member.game.state}`, opts, (err, results) => {
      if(err) return console.log(err);
     
      message.channel.createMessage(results[0].link);
    });
  } else {
    message.channel.createMessage(`You aren't listening to anything`);
  }
}
        });
    });
});

client.connect();
