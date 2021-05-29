const { Message } = require("discord.js")
const Discord = require("discord.js");
var getJSON = require('get-json')

// eslint-disable-next-line no-unused-vars

exports.run = (bot, msg, args) => {

    const ip = args.join(" ");
    
    if(ip.includes("localhost")) {
        return msg.reply("https://memegenerator.net/img/instances/52958778.jpg")
    }
    
    else if(ip.includes("127.0.0.1")) {
        return msg.reply("https://memegenerator.net/img/instances/52958778.jpg")
    }
    else if(ip.length < 4) {
    	msg.react('🤔');
        return msg.reply("please provide an IP Address");
    } else if(ip.includes(".")) {

            getJSON(`http://ip-api.com/json/${ip}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,asname,reverse,query`, function(error, response){

                //console.log(error);
                // undefined

                console.log(response);
                
                if(response.status == "fail") {
                     let ipInfo= new Discord.MessageEmbed()
                    .setColor("B1FF00")
                    .setTitle("IP Info")
                    .addField("Response", `${response.status}`)

                     msg.channel.send(ipInfo)
                } else {

                    let ipInfo= new Discord.MessageEmbed()
                    .setColor("B1FF00")
                    .setTitle("IP Info")
                    .addField("Response", `${response.status}`)
                    .setThumbnail(`https://www.countryflags.io/${response.countryCode}/flat/64.png`)
                    .addFields(
                        { name: 'IP', value: `${response.query}`, inline: true },
                        { name: 'ISP', value: `${response.isp}`, inline: true },
                        { name: 'Country', value: `${response.countryCode} | ${response.country}`, inline: false },
                        { name: 'State/Province', value: `${response.region} | ${response.regionName}`, inline: true },
                        { name : 'City', value: `${response.city}`, inline: true },
                    )

                     if(response.zip === '')
                        console.log("no zip");
                     else {
                        ipInfo.addField("Zip Code", `${response.zip}`)
                     }

                    if(response.reverse === '')
                        console.log("no reverse")
                    else {
                        ipInfo.addField("Reverse DNS", `${response.reverse}`)
                    }

                    msg.channel.send(ipInfo);
                }

            });
    } else {
        msg.reply("Incorrect args were provided. Please try again!")
    }
}

exports.help = {
    name: 'whoisip',
    usage: 'whoip',
    description: 'Gets domain WhoIs info!'
}