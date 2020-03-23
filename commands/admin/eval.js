/* eslint-disable linebreak-style */
exports.run = (client, message, args, Discord, connection) => {
// Time to rule the world
  const adminP = `p@`;
  if (args.length === 1) {
    message.channel.send('What am I evaling?');
  } else {
    try {
      let evaled = eval(message.content.substr(adminP.length + 4));
      if (typeof evaled !== 'string') {
        evaled = require('util').inspect(evaled);
      }
      message.channel.send(clean(evaled));
    } catch (err) {
      message.channel.send(`${clean(err)}`);
    }
  }
};


exports.conf = {
  name: 'eval',
  description: '',
  usage: '',
  aliases: [],
};

// eslint-disable-next-line require-jsdoc
function clean(text) {
  if (typeof text === 'string') {
    return text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
  } else {
    return text;
  }
}
