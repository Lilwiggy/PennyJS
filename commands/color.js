// Credit:
// Command by Uninvited - Uninvited#1307 on Discord

// This command is for the guild of the bot for patrons to add a custom hex as
// a patreon perk.
exports.run = (client, message, args) => {
  // Function to check if user has color and remove color to assign a new one,
  // this part will execute even if you are not a patreon but will in turn just
  // remove the role and fail at setcolor()
  if (message.guild.roles.exists('name', message.author.id)) {
    let roleee = message.guild.roles.find('name', message.author.id);
    roleee.edit({
      color: args[1],
    });
    message.channel.send(`Enjoy your hex!`);
  } else {
    setcolor(message, args);
  }
};

exports.conf = {
  name: 'color',
  description: 'Color',
  usage: 'color (hex)',
  aliases: ['colour'], // Some British asshole told me to add this.
};

// function to check if user is patreon and assign color
function setcolor(message, args) {
  if (message.guild.id === '309531752014151690') {
    if (message.member.roles.get('318256979497975810')) {
      let isOk = /^#[0-9A-F]{6}$/i;
      if (isOk.test(args[1])) {
        message.member.guild.createRole({
          name: message.author.id,
          color: args[1],
        }).then((role) => {
          role.setPosition(message.guild.roles.get('438212196309401611').position + 1);
          message.member.addRole(role);
          message.channel.send('Enjoy your hex!');
        });
      } else {
        message.channel.send('Please use a valid hex.');
      }
    } else {
      message.channel.send('This feature is for Patreons only.');
    }
  }
}
