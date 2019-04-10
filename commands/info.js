const Discord = require('discord.js');

module.exports.run = async (bot, message, args, command) =>{

    if(!message.channel.permissionsFor(bot.user).has("SEND_MESSAGES")) return;

    let infoEmbed = new Discord.RichEmbed()
    .setColor('BLURPLE')
    .addField('Bot Owner', `${message.guild.owner}`, true)
    .addField('Node.js', `[11.13.0](https://nodejs.org/en/)`, true)
    .addField('discord.js', `[11.4.2](https://discord.js.org/#/)`, true)
    .addField('Bot version', `v0.0.1`, false)
    .addField('About me', `I am a custom bot made specially for **${message.guild.name}**\n\nI am also a levelling bot with various features. I have a versatile backend support and here to meet your entertainment needs! Check all my commands in <#565128061599744000> now!`)
    .setFooter(`Playing in the server since 7th April 2019!`);
    
    try{
        message.channel.send(infoEmbed);
    }catch(err){
        return;
    }

}

module.exports.help = {
    name: "info",
    aliases: ["information"],
    description: "Shows you the bot's information",
    usage: "information",
    example: "info"
  }