/* eslint-disable linebreak-style */
exports.run = (client, message) => {
// Eternal samnation
	const sams = [
		'https://cdn.discordapp.com/attachments/222209999676506112/437386163603505172/wot_in_samnation.png',
		'https://cdn.discordapp.com/attachments/222209999676506112/437385738670178304/ertetretrertert.png',
		'https://cdn.discordapp.com/attachments/222209999676506112/437384488318926848/sdfhkjshfjk.png',
		'https://cdn.discordapp.com/attachments/222209999676506112/437382630384599050/szdjfljzfdlkjzlskdfj.png',
		'https://cdn.discordapp.com/attachments/222209999676506112/437379966108434432/dfgdfgdg.png',
		'https://cdn.discordapp.com/attachments/222209999676506112/437378617325125632/dsfsdffjkhfdjks.png',
		'https://cdn.discordapp.com/attachments/222209999676506112/437378160003383297/Screenshot_20180421-172411_1.jpg',
		'https://cdn.discordapp.com/attachments/222209999676506112/437374728101953546/Screenshot_20180421-171034_1.jpg',
		'https://cdn.discordapp.com/attachments/222209999676506112/437369483024400384/dgdfgdfgdfg.png',
		'https://cdn.discordapp.com/attachments/292097194960617473/437384726639017984/pathetic.jpg',
		'https://cdn.discordapp.com/attachments/292097194960617473/437384492269961226/natural_colour.jpg',
		'https://cdn.discordapp.com/attachments/359881162124034049/593534813890412545/a_perfect_collage.jpg',
		'https://cdn.discordapp.com/attachments/222209999676506112/438100770202845194/Sam.mp4',
		'https://cdn.discordapp.com/attachments/359881162124034049/593534820957814784/cursed_sams_undertale.jpg',
		'https://cdn.discordapp.com/attachments/359881162124034049/593534823117750325/sam_will_remember_this.jpg',
		'https://cdn.discordapp.com/attachments/359881162124034049/593534974154768418/wavy.jpg',
		'https://cdn.discordapp.com/attachments/359881162124034049/593534974523605016/Spawn_of_Satan.jpg',
		'https://cdn.discordapp.com/attachments/359881162124034049/593535111715225601/Screenshot_1.png',
	];

	const sam = sams[Math.floor(Math.random() * sams.length)];
	message.channel.send({files: [sam]});
};


exports.conf = {
	name: 'sam',
	description: '',
	usage: '',
	aliases: [],
	hidden: true,
};
