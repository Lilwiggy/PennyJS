/* eslint-disable linebreak-style */
exports.run = (client, message, args) => {
// YOU WANNA BE SLAPPED BOI!?

	const slaps = [
		'https://i.imgur.com/9oBdYj9.gif',
		'https://i2.wp.com/68.media.tumblr.com/3a47cda5a4639b7c41fad29e1f7e5b3b/tumblr_og6ol12tfk1tprwhqo4_540.gif',
		'https://img.fireden.net/a/image/1473/29/1473298322124.gif',
		'https://reallifeanime.files.wordpress.com/2014/06/akari-slap.gif',
		'https://media1.tenor.com/images/f619012e2ec268d73ecfb89af5a8fb51/tenor.gif',
		'https://media0.giphy.com/media/8UHRbvmsFVyS2VXJKU/source.gif',
		'https://i.gifer.com/origin/4d/4df75f1b3126ebdcca04791ede0ab592_w200.gif',
		'https://i.imgur.com/mIg8erJ.gif',
	];
	const slap = slaps[Math.floor(Math.random() * slaps.length)];
	let user = client.fetchGuildMember(message);
	let s = '';
  
	if (user)
		`${message.author.username} has just slapped ${user.user.username}.`;
	if (args.length === 1)
		s = `${message.author.username} has just slapped themselves in confusion.`; 
    
	if (user.id === message.author.id)
		s = `${message.author.username} has just slapped themselves in confusion.`; 

	if (user.id === '232614905533038593')
		s = `${message.author.username} just tried to slap my creator, Lilwiggy, but instead slapped themselves in confusion.`;

	if (user.id === '309531399789215744')
		s = `${message.author.username} just tried to slap me. But they missed and I slapped them back.`;

	message.channel.send(s, {
		files: [slap],
	});
};

exports.conf = {
	name: 'slap',
	description: 'Slap someone.',
	usage: 'slap [@user]',
	aliases: [],
};
