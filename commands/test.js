exports.run = (client, msg, args) => {
    //OWO What's this? You shouldn't be here, seriously this command is mine, MINE I SAY!
    if(msg.author.id === "232614905533038593")
    msg.channel.send("I'm combat ready!").catch(console.error)
    else 
    return;
}

exports.conf = {
    name: "test",
    category: "Miscelaneous",
    description: "It's a test command.",
    usage: "test",
    aliases: []
}
