exports.run = (client, message, args, Discord) => {
	// This is as morally correct as conversion sites and discord music bots so /shrug
	if (message.author.id !== '232614905533038593')
		return;
	const ytdl = require('ytdl-core');
	if (args.length === 1) {
		message.channel.send(`Usage: ${client.prefix}convert [youtube link]`);
		return;
	}
    
	let ytReg = /^(https?:\/\/)?(www.youtube.com|youtu.?be)\/.+$/;
	let config = {
		maxResults: 1,
		key: client.config.youtube.key
	};
	if (!ytReg.test(args[1])) {
		message.channel.send('Invaled youtube link.');
		return;
	}
    
	const stream = ytdl(args[1], { filter: 'audioonly'} );
	ytdl.getInfo(args[1], config, (e, r) => {
		if (e)
			console.log(e);
		message.channel.send('Converting please wait...').then((msg) => {
			let a = new Discord.Attachment(stream, `${r.player_response.videoDetails.title}.mp3`);
			msg.channel.send('Here you go!', {
				files: [
					a,
				],
			});
		});

	});

};
  
exports.conf = {
	name: 'convert',
	description: 'Converts a youtube link to an mp3 file.',
	usage: 'convert [link]',
	aliases: [],
	hidden: true
};