const Discord = require('discord.js');

const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args, command) =>{

    if(message.channel.id != '564458830272921621') return;
    if(!message.channel.permissionsFor(bot.user).has("SEND_MESSAGES")) return;
if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply(`Oops, it seems like you don't have the \`MANAGE SERVER\` permission.`);


suggest_args = args.join(' ').split('%%');
let prefix = botconfig.prefix

if(!suggest_args[0] || !suggest_args[1] || !args[0]) {
    let errorEmbed = new Discord.RichEmbed()
    .setTitle('Missing arguements')
    .setColor('BLURPLE')
    .setDescription(`Please follow the below given format to add a suggesstion\n\n\`${prefix}suggest <TITLE> %% <SUGGESTION>\``)
    .setFooter(`${message.guild.name}`, message.guild.iconURL);
    return message.channel.send(errorEmbed);
}

let iURL = message.author.avatarURL;
    let suggestEmbed = new Discord.RichEmbed()
    .setTitle('New Suggestion')
    .addField('Title',suggest_args[0])
    .addField('Description',suggest_args[1])
    .setColor('BLURPLE')
    .setFooter(`Suggested by ${message.author.tag}`, iURL);

    message.reply('Thanks for your feedback! Your suggestion will appear in #suggestions')

    try{
        bot.channels.get('564458699784192010').send(suggestEmbed).then(async function (message){
            await message.react('👍')
            await message.react('👎')
        });
    }catch(err){
        return;
    }

}

module.exports.help = {
    name: "suggest",
    aliases: ["suggestion"],
    description: "Suggest something for your server!",
    usage: "suggestion",
    example: "suggestion"
  }
