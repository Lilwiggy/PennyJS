exports.run = function (client, message,args, Discord, connection){
//Get inspired dude mayn
var http = require('http');
                var url = `http://inspirobot.me/api?generate=true`;
                http.get(url, function(res) {
                    var body = '';
            
                    res.on('data', function(chunk) {
                        body += chunk;
                    });
            
                    res.on('end', function() {
                       message.channel.send({file: body})
                    });
            })
}

exports.conf = {
    name: "inspire",
    category: "Miscelaneous",
    description: "Inspire others too",
    usage: "inspire",
    aliases: []
}