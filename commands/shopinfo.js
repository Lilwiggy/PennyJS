/* eslint-disable linebreak-style */
const catMap = new Map();
exports.run = (client, message, args, Discord) => {
// Info about our dugs I mean shop info.
	const data = require('../modules/shop.json');
	const emblems = [];
	const backgrounds = [];
	const categories = [];
	const shop = Object.keys(data);
	const cat = message.content.substr(client.prefix.length + args[0].length + 1);
	shop.forEach((x) => {
		if (data[x].type === 'background') {
			backgrounds.push(data[x].name);
		} else if (data[x].type === 'emblem') {
			emblems.push(data[x].name.toLowerCase());
		}

		if (!categories.includes(data[x].meta.c.toLowerCase())) {
			categories.push(data[x].meta.c.toLowerCase());
		}
	});
	if (args.length === 1) {
		message.channel.send(`Usage: ${client.prefix}shopinfo [backgrounds/emblems/all/category]`);
	} else if (args[1] === 'all') {
		client.shopAll.set(message.author.id, 0);
		message.channel.send({ embed: newEmbed(client, Discord, data, shop, message.author.id, 'all') }).then((msg) => {
			msg.react('⬅').then((e) => {
				e.message.react('➡');
			});
			const filter = (r, user) => user.id === message.author.id;
			const collector = msg.createReactionCollector(filter, {time: 60000 * 2});
			collector.on('collect', (r) => {
        console.log(`bitch ass hoes like elf are agat`)
				r.users.remove(message.author.id);
				if (r.emoji.name === '⬅') {
					r.users.remove(message.author.id);
					if (client.shopAll.get(message.author.id) === 0) {
						client.shopAll.set(message.author.id, shop.length - 1);
						msg.edit(newEmbed(client, Discord, data, shop, message.author.id, 'all')).catch(console.error);
					} else {
						client.shopAll.set(message.author.id, client.shopAll.get(message.author.id) - 1);
						msg.edit(newEmbed(client, Discord, data, shop, message.author.id, 'all')).catch(console.error);
					}
				} else if (r.emoji.name === '➡') {
					r.remove(message.author.id);
					if (client.shopAll.get(message.author.id) === shop.length - 1) {
						client.shopAll.set(message.author.id, 0);
						msg.edit(newEmbed(client, Discord, data, shop, message.author.id, 'all')).catch(console.error);
					} else {
						client.shopAll.set(message.author.id, client.shopAll.get(message.author.id) + 1);
						msg.edit(newEmbed(client, Discord, data, shop, message.author.id, 'all')).catch(console.error);
					}
				}
			});
			collector.on('end', () => msg.delete());
		});
	} else if (args[1] === 'backgrounds') {
		client.shopBackgrounds.set(message.author.id, 0);
		message.channel.send({ embed: newEmbed(client, Discord, data, backgrounds, message.author.id, 'backgrounds') }).then((msg) => {
			msg.react('⬅').then((e) => {
				e.message.react('➡');
			});
			const filter = (r, user) => user.id === message.author.id;
			const collector = msg.createReactionCollector(filter, {time: 60000 * 2});
			collector.on('collect', (r) => {
				r.users.remove(message.author.id);
				if (r.emoji.name === '⬅') {
					if (client.shopBackgrounds.get(message.author.id) === 0) {
						client.shopBackgrounds.set(message.author.id, backgrounds.length - 1);
						msg.edit(newEmbed(client, Discord, data, backgrounds, message.author.id, 'backgrounds')).catch(console.error);
					} else {
						client.shopBackgrounds.set(message.author.id, client.shopBackgrounds.get(message.author.id) - 1);
						msg.edit(newEmbed(client, Discord, data, backgrounds, message.author.id, 'backgrounds')).catch(console.error);
					}
				} else if (r.emoji.name === '➡') {
					if (client.shopBackgrounds.get(message.author.id) === backgrounds.length - 1) {
						client.shopBackgrounds.set(message.author.id, 0);
						msg.edit(newEmbed(client, Discord, data, backgrounds, message.author.id, 'backgrounds')).catch(console.error);
					} else {
						client.shopBackgrounds.set(message.author.id, client.shopBackgrounds.get(message.author.id) + 1);
						msg.edit(newEmbed(client, Discord, data, backgrounds, message.author.id, 'backgrounds')).catch(console.error);
					}
				}
			});
			collector.on('end', () => msg.delete());
		});
	} else if (args[1] === 'emblems') {
		client.shopEmblems.set(message.author.id, 0);
		message.channel.send({ embed: newEmbed(client, Discord, data, emblems, message.author.id, 'emblems') }).then((msg) => {
			msg.react('⬅').then((e) => {
				e.message.react('➡');
			});
			const filter = (r, user) => user.id === message.author.id;
			const collector = msg.createReactionCollector(filter, {time: 60000 * 2});
			collector.on('collect', (r) => {
				r.users.remove(message.author.id);
				if (r.emoji.name === '⬅') {
					if (client.shopEmblems.get(message.author.id) === 0) {
						client.shopEmblems.set(message.author.id, emblems.length - 1);
						msg.edit(newEmbed(client, Discord, data, emblems, message.author.id, 'emblems')).catch(console.error);
					} else {
						client.shopEmblems.set(message.author.id, client.shopEmblems.get(message.author.id) - 1);
						msg.edit(newEmbed(client, Discord, data, emblems, message.author.id, 'emblems')).catch(console.error);
					}
				} else if (r.emoji.name === '➡') {
					if (client.shopEmblems.get(message.author.id) === emblems.length - 1) {
						client.shopEmblems.set(message.author.id, 0);
						msg.edit(newEmbed(client, Discord, data, emblems, message.author.id, 'emblems')).catch(console.error);
					} else {
						client.shopEmblems.set(message.author.id, client.shopEmblems.get(message.author.id) + 1);
						msg.edit(newEmbed(client, Discord, data, emblems, message.author.id, 'emblems')).catch(console.error);
					}
				}
			});
			collector.on('end', () => msg.delete().catch(console.error));
		}).catch(console.error);
	} else if (data[args[1]]) {
		const embed = {
			author: `Shopinfo for ${args[1]}`,
			title: `Original art by ${data[args[1]].oc.name}`,
			url: data[args[1]].oc.url,
			color: 9043849,
			fields: [
				{
					name: 'Price:',
					value: data[args[1]].price
				},
				{
					name: 'Purchase:',
					value: `${client.prefix}set${data[args[1]].type} ${args[1]}`
				}
			],
			image: {
				url: data[args[1]].image
			}
		};
		message.channel.send({ embed: embed });
	} else if (categories.includes(cat.toLowerCase())) {
		catMap.set(message.author.id, 0);
		const catArray = [];
		getCat(data, cat, catArray);
		message.channel.send({ embed: newEmbed(client, Discord, data, catArray, message.author.id, 'cat') }).then((msg) => {
			msg.react('⬅').then((r) => {
				r.message.react('➡');
			});
			const filter = (r, user) => user.id === message.author.id;
			const collector = msg.createReactionCollector(filter, {time: 60000 * 2});
			collector.on('collect', (r) => {
				r.users.remove(message.author.id);
				if (r.emoji.name === '⬅') {
					if (catMap.get(message.author.id) === 0) {
						catMap.set(message.author.id, catArray.length - 1);
						msg.edit(newEmbed(client, Discord, data, catArray, message.author.id, 'cat')).catch(console.error);
					} else {
						catMap.set(message.author.id, catMap.get(message.author.id) - 1);
						msg.edit(newEmbed(client, Discord, data, catArray, message.author.id, 'cat')).catch(console.error);
					}
				} else if (r.emoji.name === '➡') {
					if (catMap.get(message.author.id) === catArray.length - 1) {
						catMap.set(message.author.id, 0);
						msg.edit(newEmbed(client, Discord, data, catArray, message.author.id, 'cat')).catch(console.error);
					} else {
						catMap.set(message.author.id, catMap.get(message.author.id) + 1);
						msg.edit(newEmbed(client, Discord, data, catArray, message.author.id, 'cat')).catch(console.error);
					}
				}
			});
		});
	} else {
		message.channel.send(`Usage: ${client.prefix}shopinfo [backgrounds/emblems/all/category]`);
	}
};

// eslint-disable-next-line require-jsdoc
function newEmbed(client, Discord, data, shop, id, type) {
	let embed = {
		color: 9043849,
	};
	if (type === 'all') {
		embed.author = `Shop info for ${shop[client.shopAll.get(id)]}`;
		embed.title = `Original art by ${data[shop[client.shopAll.get(id)]].oc.name}`;
		embed.url = data[shop[client.shopAll.get(id)]].oc.url;
		embed.fields = [
			{
				name: 'Price:',
				value: data[shop[client.shopAll.get(id)]].price,
			}, 
			{
				name: 'Purchase:',
				value: `${client.prefix}set${data[shop[client.shopAll.get(id)]].type} ${shop[client.shopAll.get(id)]}`
			}
		];
		embed.image = { url: data[shop[client.shopAll.get(id)]].image };
	} else if (type === 'backgrounds') {
		embed.author = `Shop info for ${shop[client.shopBackgrounds.get(id)]}`;
		embed.title = `Original art by ${data[shop[client.shopBackgrounds.get(id)]].oc.name}`;
		embed.url = data[shop[client.shopBackgrounds.get(id)]].oc.url;
		embed.fields = [
			{
				name: 'Price:',
				value: data[shop[client.shopBackgrounds.get(id)]].price,
			},
			{
				name: 'Purchase:',
				value: `${client.prefix}setbackground ${shop[client.shopBackgrounds.get(id)]}`,
			}
		];
		embed.image = { url: data[shop[client.shopBackgrounds.get(id)]].image };
	} else if (type === 'emblems') {
		embed.author = `Shop info for ${shop[client.shopEmblems.get(id)]}`;
		embed.title = `Original art by ${data[shop[client.shopEmblems.get(id)]].oc.name}`;
		embed.url = data[shop[client.shopEmblems.get(id)]].oc.url;
		embed.fields = [
			{
				name: 'Price:',
				value: data[shop[client.shopEmblems.get(id)]].price
			},
			{
				name: 'Purchase:',
				value: `${client.prefix}setemblem ${shop[client.shopEmblems.get(id)]}`
			}
		];
		embed.image = { url: data[shop[client.shopEmblems.get(id)]].image };
	} else if (type === 'cat') {
		embed.author = `Shop info for ${shop[catMap.get(id)].name}`;
		embed.title = `Original art by ${shop[catMap.get(id)].oc.name}`;
		embed.url = shop[catMap.get(id)].oc.url;
		embed.fields = [
			{
				name: 'Price:',
				value: shop[catMap.get(id)].price
			},
			{
				name: 'Purchase:',
				value: `${client.prefix}set${shop[catMap.get(id)].type} ${shop[catMap.get(id)].name}`
			}
		];
		embed.image = { url : shop[catMap.get(id)].image };
	}
	return embed;
}

// eslint-disable-next-line require-jsdoc
function getCat(json, input, arr) {
	Object.keys(json).forEach((o) => {
		if (json[o].meta.c.toLowerCase() === input.toLowerCase()) {
			arr.push(json[o]);
		}
	});
}

exports.conf = {
	name: 'shopinfo',
	description: 'Shop info for backgrounds or emblems or a certain category.',
	usage: 'shop info [all/backgrounds/emblems/category/item]',
	aliases: [],
};
