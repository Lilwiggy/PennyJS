// This is when the client is ready and connects to discord. It's very very boring. Please move on to the next file.
exports.run = (client) => {
    console.log(`I'm combat ready!`);
    client.user.setPresence({ game: { name: "I'm combat ready!", type: 0 } });
};
