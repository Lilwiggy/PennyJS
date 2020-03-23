// And here we have the main lobb- oh I didn't see you there. Welcome to my code. Don't judge it... please...


// Need these (for drugs)      (not really)
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./modules/config.json');
const fs = require('fs');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: config.sql.host,
  user: config.sql.username,
  password: config.sql.password,
  database: config.sql.db_name,
});

client.commands = new Map();
client.adminCommands = new Map();
client.aliases = new Map();
client.config = config;
client.mirMap = new Map();
client.queue = new Map();
client.help = new Map();
client.shopAll = new Map();
client.shopBackgrounds = new Map();
client.shopEmblems = new Map();
client.starQueue = [];

setInterval(() => {
  if (client.starQueue.length < 1)
    return;
  client.starQueue[0]();
  client.starQueue.splice(0, 1);
}, 2000);

// Hey this is that thing in the other file I need
require('./modules/functions.js')(client, connection);
let Raven = require('raven');
Raven.config(client.config.bot.err).install();
// var pl = require('./server.js');

// This is the thing that does the thing on a client event broh
fs.readdir('./events/', (err, evtFiles) => {
  if (err)
    client.users.cache.get(`232614905533038593`).send(`Error: ${err}`);
  evtFiles.forEach((file) => {
    const eventName = file.split('.')[0];
    const event = require(`./events/${file}`);
    try {
      client.on(eventName, (...args) => event.run(client, ...args, Discord, connection));
    } catch (e) {
      client.users.cache.get(`232614905533038593`).send(`Error with ${eventName}\nError: ${e}`);
    }
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

// This is the bit that does the things with the commands man
fs.readdir('./commands/', (err, cmdFiles) => {
  if (err)
    client.users.cache.get(`232614905533038593`).send(`Error: ${err}`);
  console.log(`Loaded ${cmdFiles.length} commands.`);
  cmdFiles.forEach((f) => {
    if (!f.endsWith('.js'))
      return;
    const response = client.loadCommand(f);
    if (response)
      console.log(response);
  });
});

// Admin commands to clean up the message event
fs.readdir('./commands/admin', (err, cmdFiles) => {
  if (err)
    client.users.cache.get(`232614905533038593`).send(`Error: ${err}`);
  console.log(`Loaded ${cmdFiles.length} admin commands.`);
  cmdFiles.forEach((f) => {
    if (!f.endsWith('.js'))
      return;
    const response = client.loadAdminCommand(f);
    if (response)
      console.log(response);
  });
});

// pl.run(client);

// I bet you wish you had this ( ͡° ͜ʖ ͡°)
client.login(config.bot.token);
