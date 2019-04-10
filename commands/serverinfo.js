const Discord = require('discord.js');

module.exports.run = async (bot, message, args, command) =>{

    if(!message.channel.permissionsFor(bot.user).has("SEND_MESSAGES")) return;

    var d = message.guild.createdAt;
    var dformat = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');

               var d2 = bot.user.createdAt;
               var dformat2 = [d2.getMonth()+1,
                          d2.getDate(),
                          d2.getFullYear()].join('/')+' '+
                         [d2.getHours(),
                          d2.getMinutes(),
                          d2.getSeconds()].join(':');

    let bots = message.guild.members.filter(m => m.user.bot).size;
    let userCount = message.guild.members.filter(member => !member.user.bot).size;
    let textchannel = message.guild.channels.filter(channel => channel.type === "text").size;

    let serverEmbed = new Discord.RichEmbed()
    .setAuthor(`${message.guild.name}`, `${message.guild.iconURL}`)
    .setColor('BLURPLE')
    .setThumbnail(message.guild.iconURL)
    .setDescription(`This server was created on **${dformat}**!\nI joined this server on **${dformat2}**!`)
    .addField('Members:', `👫 Total users: **${userCount}**\n👱 Humans: **${userCount - bots}**\n🤖 Bots: **${bots}**`, true)
    .addField('Channels:', `🗒 Text: **${textchannel}**\n🔊 Voice: **${message.guild.channels.size-textchannel}**`, true)
    .addField('Utility:', `Owner: ${message.guild.owner}\nRegion: **${message.guild.region}**\nServer ID: **${message.guild.id}**`, true)
    .addField('Miscellaneous: ', `Custom Emojis: **${message.guild.emojis.size}**\nRoles: **${message.guild.roles.size}**`, true);

    try{
        message.channel.send(serverEmbed);
    }catch(err){
        return;
    }

}

module.exports.help = {
    name: "serverinfo",
    aliases: ["getguild"],
    description: "Shows you the server's information!",
    usage: "serverinfo",
    example: "serverinfo"
  }