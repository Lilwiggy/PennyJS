exports.run = (client, message) => {
	// Fun fact:
	// I was retarded before and forgot that I could get the avatar from the user object
	// and made an extra API request to make myself feel special. Good times.
	let user = client.fetchGuildMember(message).user || message.author;
	let embed = {
		title: 'Your avatar',
	};
	if (user) {
		if (user.id !== message.author.id)
			embed.title = `${user.username}'s avatar`;
		embed.image = { url: user.displayAvatarURL({ size: 2048 }) };
		message.channel.send({ embed: embed });
	} else {
		message.channel.send('I could not find that user.');
	}
};

exports.conf = {
	name: 'avatar',
	description: 'Look at your\'s or someone else\'s avatar.',
	usage: 'avatar {optional: [@user/username/id]}',
	aliases: [],
};
