const Discord = require('discord.js');
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({disableEveryone: true, fetchAllMembers: true});
const fs = require('fs');
let prefix = botconfig.prefix;
const talkedRecently = new Set();
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
});
const Level = require('./models/level.js');

fs.readdir("./commands/", (err, files) =>{

    if(err) console.log(err);
  
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
      console.log("Couldn't find Commands");
      return;
    }
  
      jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
        });
      });
  
  });

  bot.on("ready", async () => {

    let servercount = bot.guilds.get('547145309592223765').memberCount;

    setInterval(() => {
        let Status = [
            `with ${servercount} users | n!help`,
            'with Wumpus | n!help',
        ];
      
        bot.user.setActivity(Status[Math.floor(Math.random() * Status.length)], { "type": "PLAYING" });
        bot.user.setStatus('online');
        }, 10 * 1000);

    console.log(`${bot.user.username} is online`);
  });

  bot.on("message", async message =>{

    if(message.author.bot) return;
    if(message.content.startsWith(prefix)) return;
    if(message.channel.id === "560336811935924274") return;

    if(talkedRecently.has(message.author.id)) {

        return;

    }else{
        
        let coinstoAdd = Math.floor(Math.random() * 10)+15;

        Level.findOne({
            userID: message.author.id
        }, (err, level) => {
            if(err) console.log(err);
    
            if(!level){
                const newLevel = new Level({
                    userID: message.author.id,
                    xp: coinstoAdd,
                    level: 1,
                    rank: 0,
                    totxp: coinstoAdd
                })

                newLevel.save().catch(err => console.log(err));
                
            }else{
                
                let totExp = level.xp + coinstoAdd;
                if(totExp > (level.level*200)){
                  level.xp = totExp - (level.level*200);
                  level.totxp = level.totxp + coinstoAdd;
                  level.level = level.level + 1;
                    bot.channels.get('560520989016981504').send(`<a:levelup:565440320750485504> **GG <@${message.author.id}>!** <a:levelup:565440320750485504>, You have leveled up to level **${level.level}**`);
                }else{
                  level.xp = level.xp + coinstoAdd;
                  level.totxp = level.totxp + coinstoAdd;
                }

                let role1 = '560871018089152512';
                let role2 = '553198335280939008';
                let role3 = '553198504512716800';
                let role4 = '564480448236093440';

                if(level.level ===5){
                    message.member.addRole(role1);
                }if(level.level === 10){
                    message.member.addRole(role2);
                    message.member.removeRole(role1);
                }if(level.level === 20){
                    message.member.removeRole(role2);
                    message.member.addRole(role3);
                }if(level.level === 30){
                    message.member.removeRole(role3);
                    message.member.addRole(role4);
                }

                level.save().catch(err => console.log(err));
            }
    
        })

        talkedRecently.add(message.author.id);
        setTimeout(() => {
            talkedRecently.delete(message.author.id);
        }, 60000);

    }

})

  bot.on("guildMemberAdd", member =>{
    let userURL = member.user.avatarURL;

    let welEmbed = new Discord.RichEmbed()
    .setAuthor(member.user.tag, userURL)
    .setColor('BLURPLE')
    .setThumbnail(userURL)
    .setDescription(`<:wumpuswelcome:564434594250752031> Welcome to **${member.guild.name}**! <a:wumpusdance:564435111676870657>`)
    .setTimestamp();

    member.guild.channels.get('560520989016981504').send(welEmbed);
})

bot.on("guildMemberRemove", member =>{

  Level.findOneAndDelete({
      userID: member.id
  }, (err, res) =>{
      if(err) console.log(err);

      console.log(`${member} has been cleaned from the database`)
  })
})

bot.on("message", async message =>{

  if(!message.content.startsWith(prefix)) return;
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if(!message.channel.permissionsFor(bot.user).has("SEND_MESSAGES")) return;

  
  let args = message.content.slice(prefix.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();
  let command;

  if (bot.commands.has(cmd)) {
      command = bot.commands.get(cmd);
  } else if (bot.aliases.has(cmd)) {
      command = bot.commands.get(bot.aliases.get(cmd));
  }
  try {
      command.run(bot, message, args, command);
  } catch (e) {
      return;
  }

});

bot.login(process.env.BOT_TOKEN);
