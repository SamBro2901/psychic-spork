const Discord = require('discord.js');
const sm = require('string-similarity');

module.exports.run = async (bot, message, args, command) =>{

    return;
    if(!message.channel.permissionsFor(bot.user).has("SEND_MESSAGES")) return;

    const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
    
    try{
        message.channel.send(emojiList);
    }catch(err){
        return;
    }

}

module.exports.help = {
    name: "listemojis",
    aliases: ["guildemojis", "emojis"],
    description: "Shows you a list of all the server emojis!",
    usage: "listemojis",
    example: "listemojis"
  }
