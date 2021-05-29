const { Message } = require("discord.js")
const Discord = require("discord.js");

// eslint-disable-next-line no-unused-vars

exports.run = (bot, msg, args) => {

    msg.reply("test");
}

exports.help = {
    name: 'test',
    usage: 'test',
    description: 'Gets domain WhoIs info!'
}
