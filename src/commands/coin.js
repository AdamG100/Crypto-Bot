const { Message } = require("discord.js")
const Discord = require("discord.js");
var getJSON = require('get-json')

// eslint-disable-next-line no-unused-vars

exports.run = (bot, msg, args) => {

    const coin = args.join(" ");

    if(coin.length === 0) {
        msg.react('🤔');
        return msg.reply("please provide a valid coin");
    }

    getJSON(`https://api.coinstats.app/public/v1/coins/${coin}?currency=ZAR`, function(error, response){
 
        console.log(error);
        // undefined
    
        console.log(response);

        let coinInfo= new Discord.MessageEmbed()
        .setColor("ff8500")
        .setTitle(`${response.coin.name}`)
        .addField("Symbol", `${response.coin.symbol}`)
        .addField("Rank", `${response.coin.rank}`)
        .addField("Price", `${response.coin.price}`)
        .setThumbnail(`${response.coin.icon}`)
        .addFields(
            { name: 'Price Change 1 Hour', value: `${response.coin.priceChange1h}`, inline: true },
            { name: 'Price Change 1 Day', value: `${response.coin.priceChange1d}`, inline: true },
            { name: 'Price Change 1 Week', value: `${response.coin.priceChange1w}`, inline: true },
        )

        msg.channel.send(coinInfo);

    });
}

exports.help = {
    name: 'coin',
    usage: 'coin',
    descrcointion: 'Gets Coin Price Data'
}