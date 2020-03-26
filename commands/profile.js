/* eslint-disable linebreak-style */
exports.run = (client, message, args, Discord, connection) => {
  // Hey look you made it from the profile module, how do you do?
  // Well anyways this is the actual profile command. Made to be easier so that it's less messy.
  // Also made a little less messy by Uninvited.

  const pro = require('../modules/profile.js');
  // Gonna need the module fam ^^

  let user = client.fetchGuildMember(message) || message.author;
  if (user.user) {
    user = user.user;
  }
          if (user.bot) {
            // Still preventing the robot uprising here^^
            message.channel.send('Haha. Silly you. Bots don\'t have profiles!');
          } else {
            pro.pro(client, user.id, user.username, user.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }), message, connection, Discord);
          }
};

exports.conf = {
  name: 'profile',
  description: 'Shows your profile on Penny. Or someone else\'s profile.',
  usage: 'profile {optional: [@user/username]}',
  aliases: [],
};
