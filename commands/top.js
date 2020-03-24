/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
exports.run = (client, message, args, Discord, connection) => {
  // Leaderboard
  message.channel.send(`Penny has been having issues lately and the current one is not being able to install node canvas. As such the profile and color commands are down. My apologies and updates will come ASAP over @ https://discord.gg/kwcd9dq`)
/*	connection.query('SELECT * FROM `User` ORDER BY `Level` DESC LIMIT 10', (err, res) => {
		if (err) {
			throw err;
		}
		const Canvas = require('canvas');
		const neko = require('nekocurl');
		const Image = Canvas.Image;
		const canvas = new Canvas(516, 580);
		const ctx = canvas.getContext('2d');
		const img = new Image();
		const Font = Canvas.Font;
		const font = new Font('InriaSans', './fonts/inria-sans.regular.ttf');
		ctx.addFont(font);
		ctx.fillStyle = '#18191c';
		ctx.fillRect(0, 0, 516, 582);
		let x = 8;
		let y = 11;
		ctx.globalAlpha = 0.50;
		for (let i = 0; i < 10; i++) {
			if (i === 5) {
				y = 11;
				x = 262;
			} else if (i !== 0) {
				y += 113;
			}
			ctx.fillStyle = '#000000';
			ctx.fillRect(x, y, 246, 105);
		}
		ctx.globalAlpha = 1;

		render(img, neko, ctx, canvas, message, Discord, res, client).catch(console.error);
  }); */
  
};

function getUser(client, id) {
	if (!client.users.cache.get(id)) {
		return `User not found. ID: ${id}`;
	} else {
		return client.users.cache.get(id);
	}
}

async function render(img, neko, ctx, canvas, message, Discord, arr, client) {
	let x = 23;
	let y = 28;
	for (let i = 0; i < 10; i++) {
		const user = getUser(client, arr[i].User_ID);
		let username = 'Unknown';
		if (user.id) {
			img.src = await neko.get(user.displayAvatarURL({ size: 2048, dynamic: true }), {autoString: false});
			username = user.username;
		} else {
			img.src = await neko.get('https://cdn.discordapp.com/embed/avatars/0.png', {autoString: false});
		}
		if (i === 5) {
			x = 277;
			y = 28;
		} else if (i !== 0) {
			y += 113;
		}
		ctx.font = '30px "Inria Sans"';
		ctx.fillStyle = '#fff';
		username = (username.length > 8) ? `${username.substr(0, 8)}...` : username;
		ctx.fillText(`#${i + 1}`, x + 180, y + 15);
		ctx.font = '20px "Inria Sans"';
		ctx.fillText(username, x + 74, y + 15);
		ctx.fillText(`Level: ${arr[i].Level}`, x + 74, y + 40);
		ctx.fillText(`XP: ${arr[i].XP}/${arr[i].Next}`, x + 74, y + 65);
		ctx.save();

		ctx.beginPath();
		ctx.arc(x + (67 / 2), y + (67 / 2), 67 / 2, 0, Math.PI * 2, false);

		ctx.clip();
		ctx.drawImage(img, x, y, 67, 67);
		ctx.restore();
	}


	canvas.toBuffer((e, buff) => {
		const pro = new Discord.Attachment()
			.setAttachment(buff, 'hi.png');

		message.channel.send({
			file: pro,
		});
	});
}

exports.conf = {
	name: 'top',
	description: 'Top 10 users with the highest XP.',
	usage: 'top',
	aliases: ['leaderboard'],
};
