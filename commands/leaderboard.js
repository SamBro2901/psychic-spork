const Discord = require('discord.js'); 
const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:CRQ8wzventP78fIM@mirage-shard-00-00-2rl8l.mongodb.net:27017,mirage-shard-00-01-2rl8l.mongodb.net:27017,mirage-shard-00-02-2rl8l.mongodb.net:27017/test?ssl=true&replicaSet=Mirage-shard-0&authSource=admin&retryWrites=true', {
  useNewUrlParser: true
});
const Level = require("../models/level.js");

module.exports.run = async (bot, message, args, command) =>{

  if(!message.channel.permissionsFor(bot.user).has("SEND_MESSAGES")) return;

  let content = "";
  let member;
  let lEmbed;
  let max = 20;
  let startno = 0;

  Level.find({ 

  }).sort([
      ['totxp', 'descending']
  ]).exec((err, res) => {
      if(err) console.log(err);

          for(let i = 0; i < max; i++){

              try{
                member = bot.users.get(res[i].userID) || "Invalid User"; 
              }catch(err){
                return message.reply("The server doesn't have a top 20 list to display, chat more frequently to gain xp!")
              }
                if(i >= startno){
                  content = content+`${i+1}. **${member.username}:** Experience: \`${res[i].totxp}\`\n`;
                }//                            <@${res[i].userID}>:
              

              let sicon = message.guild.iconURL;
              lEmbed = new Discord.RichEmbed()
              .setAuthor(`Leaderboard for ${message.guild.name}`, sicon)
              .setColor("BLURPLE")
              .setDescription(content)
              .setTimestamp();
            }

              try{
                message.channel.send(lEmbed);
              }catch(err){
                return;
              }
            
            })
}

module.exports.help = {
    name: "leaderboard",
    aliases: ["top", "lb", "rank", "ranks"],
    description: "Shows a fantastic leaderboard!",
    usage: "!leaderboard",
    example: "!leaderboard"
  }
