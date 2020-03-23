exports.run = (client, message, args, Discord, connection) => {
	// Needs more hugs


	let wiggyID = '232614905533038593';

	let images = require('../images.json');
	let lols = images.hugs.lolno;
	let hugsAnime = images.hugs.anime;
	let hugsReal = images.hugs.noAnime;
	//              Elferton               Ashurie                Matza	         Batthew's dummy thicc cheeks
	let ppl = ['407773762814083072', '197850690247327744', '310839399728545792', '600058196249411587'];
  
	let user = client.fetchGuildMember(message);
	if (!user) {
		message.channel.send('Please mention a valid user.');
		return;
	}

	if (user.id === message.author.id) {
		message.channel.send('You can\'t hug yourself! That\'s just a bit weird.');
	} else if (user.id === wiggyID && !ppl.includes(message.author.id)) {
		let hug = lols[Math.floor(Math.random() * lols.length)];
		getHug(message, hug, user, true, client);
	}  else if (user.user.bot) {
		if (user.id === '309531399789215744')
			message.channel.send(`${message.author.username} just gave me a hug! <3`, { files: ['https://cdn.discordapp.com/attachments/289898558898044928/518528032156287036/Penny_tackle_hugs_Ruby.gif'] });
		else
			message.channel.send('Silly you! Bots don\'t have emotions!');
	} else {
		connection.query(`SELECT \`weeb\` FROM \`User\` WHERE \`User_ID\` = ${user.id}`, (err, res) => {
			if (err)
				throw err;
			if (res[0].weeb === 'on') {
				let hug = hugsAnime[Math.floor(Math.random() * hugsAnime.length)];
				getHug(message, hug, user, false, client);
			} else {
				let hug = hugsReal[Math.floor(Math.random() * hugsReal.length)];
				getHug(message, hug, user, false, client);
			}
		});
	}

};

let failed = 0;
let failedHugs = [];

function getHug(msg, hug, user, fail, client) {
	const fetch = require('node-fetch');

	console.log(hug);
	fetch(hug).catch(() => {
		failed++;
		failedHugs.push(hug);
		if (failed === 3) {
			msg.channel.send('I could not load 3 hug gifs in a row. I have reported this back to the dev """"""""""""team"""""""""""""" (it\'s just one person please help I\'m lonely). Thank you for understanding.');
			client.channels.get('686714427650736133').send(`GET requests failed for ${failedHugs.join('\n')}. Please fix this.`);
			failed = 0;
			failedHugs = [];
			return;
		}
		client.channels.get('686714427650736133').send(`GET requests failed for ${failedHugs.join('\n')}. (More may come in)`);
		getHug(msg, hug, user, fail, client);
	});
	if (fail) {
		msg.channel.send(`${msg.author} just tried to hug Lilwiggy. Yeah that didn't work.`, { file: hug });
		failed = 0;
		failedHugs = [];
		return;
	}
	msg.channel.send(`${msg.member.displayName} just gave ${user.displayName} a hug!`, {
		files: [hug],
	}).then(() => { failed = 0; failedHugs = [];});
}


exports.conf = {
	name: 'hug',
	description: 'Give someone a hug!',
	usage: 'hug [@user]',
	aliases: ['fuck'],
};
