const Discord = require('discord.js');

module.exports.run = async (bot, message, args, command) =>{
    
    if(message.channel.id != '565128061599744000') return;

    if(!message.channel.permissionsFor(bot.user).has("SEND_MESSAGES")) return;

    let totalSeconds = (bot.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.round(totalSeconds % 60);

    try{
        message.channel.send(`Uptime: **${days} days, ${hours} hours, ${minutes} minute(s) and ${seconds} seconds**`);
    }catch(err){
        return;
    }


}

module.exports.help = {
    name: "uptime",
    aliases: ["up"],
    description: "Returns the Uptime of the bot",
    usage: "uptime",
    example: "uptime"
  }
