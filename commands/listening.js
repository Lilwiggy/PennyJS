/* eslint-disable linebreak-style */
exports.run = async(client, message) => {
	let search = require('youtube-search');
	let opts = {
		maxResults: 10,
		key: client.config.youtube.key,
	};
	let member = client.fetchGuildMember(message) || message.member;
	if (!member) {
		message.channel.send('I cannot find that user.');
	} else {
		let pre = member.presence.activities;
		if (pre.filter((g) => g.type === 'LISTENING' && g.name === 'Spotify').length < 1) {
			message.channel.send(`${member.displayName} is not listening to anything.`);
		} else {
			pre = pre.find((g) => g.type === 'LISTENING' && g.name === 'Spotify');
			let album = [];
			let artist = [];
			let listening = [];
			let users = message.guild.members.cache.filter((m) => {
				if (m.bot)
					return;
				if (m.id === member.id)
					return;
				let mPresence = m.presence.activities.find((g) => g.type === 'LISTENING' && g.name === 'Spotify');
				if (mPresence) {
					if (mPresence.details === pre.details) {
						listening.push(m);
						return mPresence.details === pre.details;
					} else if (mPresence.assets.largeText === pre.assets.largeText) {
						album.push(m);
						return mPresence.assets.largeText === pre.assets.largeText;
					} else if (mPresence.state === pre.state) {
						artist.push(m);
						return mPresence.state === pre.state;
					}
				}
			});
			let s = await search(`${pre.details} by ${pre.state}`, opts);
			let embed = {
				title: pre.details,
				thumbnail: {
					url: pre.assets.largeImageURL({ size:2048 }),
				},
				color: 2021216,
				description: `By: ${pre.state}\nAlbum: ${pre.assets.largeText}\n[YouTube](${s.results[0].link})`,
				fields: [
				],
			};
			if (users.size > 0) {
				let listeners = [];
				let albums = [];
				let artists = [];
				users.forEach((u) => {
					let uname = u.user.username;
					if (u.id === '120308435639074816') 
						uname = 'RaidAndGay';

					if (listening.includes(u))
						listeners.push(uname);
					else if (album.includes(u))
						albums.push(uname);
					else if (artist.includes(u))
						artists.push(uname);
				});

				if (listening.length > 0) {
					if (listening.length === 1)
						embed.fields.push({ name: `Listening with ${listening.length} other.`, value: listeners.toString() });
					else
						embed.fields.push({ name: `Listening with ${listening.length} others.`, value: listeners.toString() });
				} else if (album.length > 0) {
					if (album.length > 1)
						embed.fields.push({ name: `${album.length} others are listening to this album.`, value: albums.join(', ').toString() });
					else
						embed.fields.push({ name: `${album.length} other is listening to this album.`, value: albums.toString() });
				}
				if (artist.length > 0) {
					if (artist.length === 1)
						embed.fields.push({ name: `${artist.length} other is listening to this artist.`, value: artists.toString() });
					else
						embed.fields.push({ name: `${artist.length} others are listening to this artist.`, value: artists.join(', ').toString() });
				}
			}

			message.channel.send({ embed: embed });
		}
	}
};


exports.conf = {
	name: 'listening',
	description: 'Shows what you\'re listening to on Spotify.',
	usage: 'listening',
	aliases: [],
};
