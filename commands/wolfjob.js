/* eslint-disable linebreak-style */
exports.run = (client, message, args, Discord) => {
	// Send help pls they are holding me hostage in
	// grumpcord forcing me to make this command
	const { createCanvas, Image } = require('canvas');
	const neko = require('nekocurl');
	const fs = require('fs');

	const canvas = createCanvas(298, 297);
	const ctx = canvas.getContext('2d');

	const img = new Image();

	const user = client.fetchGuildMember(message) || args[1] || message.attachments.first() || 'None';

	if (user === 'None') {
		message.channel.send('Please provide a valid user or image or image URL');
	} else {
		render(img, user, ctx, fs, neko, canvas, Discord, message);
	}
};

// eslint-disable-next-line require-jsdoc
async function render(img, user, ctx, fs, neko, canvas, Discord, m) {
	const urlReg = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
	img.src = fs.readFileSync('./modules/wj.jpg');
	ctx.drawImage(img, 0, 0);
	img.src = await neko.get(m.author.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }), {autoString: false});
	ctx.drawImage(img, 135, 80, 60, 60);
	if (urlReg.test(user)) {
		img.src = await neko.get(user, {autoString: false});
	} else if (user.user) {
		img.src = await neko.get(user.user.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }), {autoString: false});
	} else {
		img.src = await neko.get(user.url, {autoString: false});
	}

	ctx.drawImage(img, 160, 10, 50, 50);

	canvas.toBuffer((e, buffer) => {
		if (e) {
			console.log(e);
		}
		const att = new Discord.MessageAttachment(buffer, 'wolfjob.png');
		m.channel.send(`**${m.author.username}** just gave a wolfjob.`, {
			files: [att],
		});
  }); 
};

exports.conf = {
	name: 'wolfjob',
	description: 'Idek man',
	usage: 'wolfjob @user',
	aliases: ['wj'],
	hidden: true,
};
