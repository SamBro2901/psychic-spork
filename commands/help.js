const Discord = require('discord.js');
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args, command) =>{
    
    if(message.channel.id != '565128061599744000') return;

    if(!message.channel.permissionsFor(bot.user).has("SEND_MESSAGES")) return;

    let prefix = botconfig.prefix;
    let iURL = bot.user.displayAvatarURL;
    let helpEmbed = new Discord.RichEmbed()
    .setAuthor(`${bot.user.username}'s Commands`, iURL)
    .addField('__**Core**__:', `**${prefix}info**   Shows info about the bot\n**${prefix}uptime**    Shows the uptime of the bot`)
    .addField('__**Levels**__:', `**${prefix}level**      Displays your current level in a beautiful layout\n**${prefix}leaderboard**     Displays the list of top 20 active users`)
    .addField('__**Server Stats**__:', `**${prefix}serverinfo**     Shows info about the server\n**${prefix}listemojis**   Gives a list of the custom emojis in the server\n**${prefix}suggestion**     Drop a suggestion to see the guild member's choices`)
    .setColor('BLURPLE')
    .setTimestamp();

    try{
        message.channel.send(helpEmbed);
        message.react('✅');
    }catch(err){
        return;
    }

}

module.exports.help = {
    name: "help",
    aliases: [],
    description: "Gives you a complete list of help commands.",
    usage: "level",
    example: "level"
  }
