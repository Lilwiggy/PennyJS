//MSN Weather module
const weather = require('weather-js');

exports.run = (client, message, args, Discord) => {
    
    weather.find({search: args.join(' '), degreeType: 'F'}, function(err, result) {
        /*Grabs data from the MSN weather API in fahrenheit,
         other conversions need to be done seperately because 
         I don't want to do 2 API requests*/

        if(err)
          console.log(err);
        
            let info = result[0];
            let windSpeed = info.current.windspeed;
            let windSpeedRaw = windSpeed.replace("mph", "");

                //Ugly replacer thing: Parses numbers for the embed
                //Looks bad but works
            let windDirection = info.current.winddisplay;
            let windDirectionRaw = windDirection.replace(windSpeedRaw, "");
            let windDirectionRawVar = windDirection.replace("mph", "");
            let windDirectionRaw = windDirectionRawVar.replace(windSpeedRaw, "");

            message.channel.send({embed: {
                    title: "Weather information for " + info.location.name,
                        "footer": {
                            "icon_url": "https://kitk.us/bot/images/micro.png", //MSN logo, hosted on my webserver but you can probably just use another site if you want
                            "text": "Powered by MSN Weather"
                        },
                        "thumbnail": {
                            "url": info.current.imageUrl
                        },
                    fields: [
                        { name: "Weather Stats", value: "Temp: " + info.current.temperature + "°F • " + 
                        (Math.ceil(((info.current.temperature - 32) * (0.5556)) / 1) * 1) + "°C" + //Metric conversions whee
                        "\nFeels like: " + info.current.feelslike + "°F • " + (Math.ceil(((info.current.feelslike - 32) * (0.5556)) / 1) * 1) + "°C\n" //More metric conversions
                        + "Humidity: " + info.current.humidity + "%", inline: true},

                        { name: "Wind", value: windSpeedRaw + "mph • " + (Math.ceil((windSpeedRaw) * 1.61) * 1) + " km/h\n" + "Direction: " + windDirectionRaw , inline: true}
                    ]
                }
            });
            
});

  };
  
  exports.conf = {
    name: 'weather',
    description: 'Looks at the weather for a given city',
    usage: 'weather [city-name]',
    aliases: [],
  };
