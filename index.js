// And here we have the main lobb- oh I didn't see you there. Welcome to my code. Don't judge it... please...

// Need these (for drugs)      (not really)
const Discord = require('discord.js');
const fs = require('fs');
const mysql = require('mysql');
const config = require('./modules/config.json');

const client = new Discord.Client();
const connection = mysql.createConnection({
    host: config.sql.host,
    user: config.sql.username,
    password: config.sql.password,
    database: config.sql.db_name,
});

client.commands = new Map();
client.aliases = new Map();
client.config = config;
client.mirMap = new Map();

// Hey this is that thing in the other file I need
require('./modules/functions.js')(client, connection);

// This is the thing that does the thing on a client event broh
fs.readdir('./events/', (err, evtFiles) => {
    if (err) {
        throw new Error(err);
    }

    evtFiles.forEach(file => {
        const eventName = file.split('.')[0];
        const event = require(`./events/${file}`);
        client.on(eventName, (...args) => event.run(client, ...args, Discord, connection));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

// This is the bit that does the things with the commands man
fs.readdir('./commands/', (err, cmdFiles) => {
    if (err) {
        throw new Error(err);
    }

    cmdFiles.forEach(f => {
        if (!f.endsWith('.js')) return;

        const response = client.loadCommand(f);

        if (response) console.log(response);
    });
});

// Sets a new game every minute. Makes sure it doesn't do the same thing twice.
setInterval(function setGame() {
    let names = [
        'Salutations!',
        '//help',
        `with ${client.guilds.size} servers`,
        'with Ruby',
        'with Yang',
        'with Weiss',
        'with Blake',
        'with Zwei',
        'I\'m combat ready!',
    ];
    let game = names[Math.floor(Math.random() * names.length)];

    fs.readFile('./ai/last.json', (err, data1) => {
        if (err) {
            throw new Error(err);
        }
        let data = JSON.parse(data1);
        if (game === data.game) {
            setGame();
        } else {
            client.user.setPresence({ game: { name: game, type: 0 } });

            let fileName = `./ai/last.json`;
            let file = require(fileName);
            file.game = game;

            fs.writeFile(fileName, JSON.stringify(file), err => {
                if (err) {
                    client.users.get('232614905533038593').send(`I'm sorry but this happened:\n${err}\n\nSorry...`);
                }
            });
        }
    });
}, 60000);

// I bet you wish you had this ( ͡° ͜ʖ ͡°)
client.login(config.bot.token);
