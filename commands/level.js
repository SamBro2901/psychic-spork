const Discord = require('discord.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:EkqTOSDYCVblwq2t@netamodmail-ehxnj.mongodb.net/test?retryWrites=true', {
  useNewUrlParser: true
});
const Level = require('../models/level.js');
const sm = require('string-similarity');

module.exports.run = async (bot, message, args, command) =>{

  if(!message.channel.permissionsFor(bot.user).has("SEND_MESSAGES")) return;

    let user;
    let iURL;
    let l_username;
    let iDiscrim;
    let l_color;
    let l_tag;
    let l_role;
    let l_roles = "No level role";
    if(args[0]){
        let luser = message.mentions.members.first();
        if(!luser){
            
            try{
            let members = [];
            let indexes = [];
    
            message.guild.members.forEach(function(member){
              members.push(member.user.username);
              indexes.push(member.id);
            });
    
            let match = sm.findBestMatch(args.join(' '), members);
            let username = match.bestMatch.target;
            let member = message.guild.members.get(indexes[members.indexOf(username)]);
    
            user = member.id;
            iURL = member.user.avatarURL;
            iDiscrim = member.user.discriminator;
            l_tag = member.user.tag;
            l_username = member.user.username;
            l_color = member.displayHexColor;
            l_role = member.highestRole.name;
          }catch(err){
            return message.channel.send(failEmbed);
          }
          
            
        }else{
          user = luser.id;
          iURL = luser.user.avatarURL;
          iDiscrim = luser.discriminator;
          l_tag = luser.user.tag;
          l_username = luser.user.username;
          l_color = luser.displayHexColor;
          l_role = luser.highestRole.name;
        }
      }else{
        user = message.author.id;
        iURL = message.author.avatarURL;
        iDiscrim = message.author.discriminator;
        l_tag = message.author.tag;
        l_username = message.author.username;
        l_color = message.member.displayHexColor;
        l_role = message.member.highestRole.name;
      }

      Level.findOne({
        userID: user
      }, (err, level) =>{
    
        if(err) console.log(err);

        if(!level){
            let failEmbed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setDescription(`${l_tag} hasn't opened a profile yet! Please send a message to automatically begin your profile!`);
            return message.channel.send(failEmbed);
          }

          if(level.level >=5 && level.level <10){
            l_roles = "• Baby Wumpus | lvl 5";
          }else if(level.level >=10 && level.level <20){
            l_roles = "• Independent Wumpus | lvl 10";
          }else if(level.level >=20 && level.level <30){
            l_roles = "• Leafed Wumpus | lvl 20";
          }else if(level.level >=30 && level.level <100){
            l_roles = "• Adorable Wumpus | lvl 30";
          }

          let levelEmbed = new Discord.RichEmbed()
          .setAuthor(message.guild.name, message.guild.iconURL)
          .setColor(l_color)
          .setThumbnail(iURL)
          .addField(l_tag, `${l_role}`, false)
          .addField(`Level`, `${level.level}`, true)
          .addField(`Role`, `${l_roles}`, true)
          .addField('Current XP', `${level.xp}/${level.level*200}`)
          .setTimestamp();

          try{
            message.channel.send(levelEmbed);
          }catch(err){
            return;
          }

      })


}

module.exports.help = {
    name: "level",
    aliases: ["rank"],
    description: "Shows your current level and ranking!",
    usage: "level",
    example: "level"
  }