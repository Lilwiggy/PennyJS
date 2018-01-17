// RWBY Emblems my man
exports.run = (client, message, args, Discord, connection) => {
    if (args.length === 1) {
        message.channel.send('Usage: //emblem [RWBY character]');
    } else {
        if (args[1].toLowerCase() === 'ruby') {
            message.channel.send("Ruby's emblem: <:ruby:335563882309615627>");
        } else if (args[1].toLowerCase() === 'yang') {
            message.channel.send("Yang's emblem: <:yang:335563905906769942>");
        } else if (args[1].toLowerCase() === 'weiss') {
            message.channel.send("Weiss' emblem: <:weiss:335563894435348482>");
        } else if (args[1].toLowerCase() === 'blake') {
            message.channel.send("Blake's emblem: <:blake:342465311624134656>");
        } else if (args[1].toLowerCase() === 'cinder') {
            message.channel.send("Cinder's emblem: <:cinder:335563597532889088>");
        } else if (args[1].toLowerCase() === 'emerald') {
            message.channel.send("Emerald's emblem: <:emerald:335563638444392448>");
        } else if (args[1].toLowerCase() === 'jaune') {
            message.channel.send("Jaune's emblem: <:jaune:335563671944167425>");
        } else if (args[1].toLowerCase() === 'ren') {
            message.channel.send("Ren's emblem: <:ren:335563713534885889>");
        } else if (args[1].toLowerCase() === 'neo') {
            message.channel.send("Neo's emblem: <:neo:335563743188484097>");
        } else if (args[1].toLowerCase() === 'nora') {
            message.channel.send("Nora's emblem: <:nora:335563781562302466>");
        } else if (args[1].toLowerCase() === 'penny') {
            message.channel.send("Penny's emblem: <:penny:335563810691743746>");
        } else if (args[1].toLowerCase() === 'pyrrah') {
            message.channel.send("Pyrrah's emblem: <:pyrrha:335563844867063809>");
        } else if (args[1].toLowerCase() === 'qrow') {
            message.channel.send("Qrow's emblem: <:qrow:335563858364071936>");
        } else if (args[1].toLowerCase() === 'roman') {
            message.channel.send("Roman's emblem: <:roman:335563871232458752>");
        } else if (args[1].toLowerCase() === 'zwei') {
            message.channel.send("Zwei's emblem: <:zwei:335563918112194591>");
        }
    }
};

exports.conf = {
    name: 'emblem',
    category: 'Miscelaneous',
    description: 'RWBY emblems',
    usage: 'emblem',
    aliases: [],
};
