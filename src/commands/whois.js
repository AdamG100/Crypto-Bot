const { Message } = require("discord.js")
const Discord = require("discord.js");
var getJSON = require('get-json')

// eslint-disable-next-line no-unused-vars

exports.run = (bot, msg, args) => {

    const domain = args.join(" ");

    if(domain.length === 0) {
        msg.react('🤔');
        return msg.reply("please provide a domain Address");
    }
    
    if(domain.includes("nerdnetwork.digital")) {
        msg.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsnHjHaUExTdH6NeUQd7m5BhW2GBvOi-_eKA&usqp=CAU")
    }

    

    getJSON(`https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_YOm9INcgtuCYAOvu3F1T7vxGMeqK5&outputFormat=JSON&ip=1&domainName=${domain}`, function(error, response){
    getJSON(`https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_YOm9INcgtuCYAOvu3F1T7vxGMeqK5&domainName=${domain}&credits=DA`, function(error, response2){
 
        console.log(error);
        // undefined
    
        console.log(response);
        console.log(response2);

        let domainInfo= new Discord.MessageEmbed()
        .setColor("288FEB")
        .setTitle("Domain WHOIS Info")
        // Currently problematic
        // .setDescription(`The Domain ${response.WhoisRecord.domainName} is registered in ${response.WhoisRecord.registryData.registrant.country}`)
        // .setThumbnail(`https://www.countryflags.io/${response.WhoisRecord.registryData.registrant.countryCode}/flat/64.png`)
        // Currently problematic
        .addField(`Domain Name`, `[${response2.DomainInfo.domainName}](https://${response2.DomainInfo.domainName})`)
        .addFields(
            { name: 'Domain Registrar', value: `[${response.WhoisRecord.registrarName}](${response.WhoisRecord.registryData.customField3Value})`, inline: false },
            { name: 'Domain Availability', value: `${response2.DomainInfo.domainAvailability}`, inline: false },
            { name: 'Creation Date', value: `${response.WhoisRecord.registryData.createdDateNormalized}`, inline: true },
            { name: 'Expiration Date', value: `${response.WhoisRecord.registryData.expiresDateNormalized}`, inline: true },
            { name: 'Updated Date', value: `${response.WhoisRecord.audit.updatedDate}`, inline: true },
            { name: 'Nameservers', value: `${response.WhoisRecord.registryData.nameServers.rawText}`, inline: false },

        )
        .addField("Domain IP Addresses", `${response.WhoisRecord.ips}`)

        msg.channel.send(domainInfo);

    })});
}
//  123456
exports.help = {
    name: 'whois',
    usage: 'whois',
    descrdomaintion: 'Gets domain Whois info!'
}
