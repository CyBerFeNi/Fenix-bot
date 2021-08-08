const discord = require("discord.js");
keepAlive = require('./server.js')

const client = new discord.Client({
  disableEveryone: true
});
module.exports = client;


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://fenixadmin:43FWE3ZVRMWSBA24@fenix.nwin8.mongodb.net/Data', {
  useUnifiedTopology : true,
  useNewUrlParser : true,
  }).then(console.log('connected to mongo db'))

const { GiveawaysManager } = require('discord-giveaways');
//const inviteTracker = require(`./events/inviteTracker.js`);

//nviteTracker(client);//

client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
const { prefix, ServerID } = require("./config.json")

client.on("ready", () => {
  console.log(":D")



})
client.on("channelDelete", (channel) => {
  if (channel.parentID == channel.guild.channels.cache.find((x) => x.name == "HELP Tickets")) {
    const person = channel.guild.members.cache.find((x) => x.id == channel.name)
    if (!person) return;
    let embed = new discord.MessageEmbed()



  }
})
client.on("message", async message => {

  if (message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  let command = args.shift().toLowerCase();


  if (message.guild) {

    if (command == "setup") {

      if (!message.content.startsWith(prefix)) return;

      if (!message.member.hasPermission("Administratorius", "Moderator","CO-Owner", "Unban (ADMIN) ")) {

        return message.channel.send("You need Admin Permissions to setup the modmail system!")

      }

      if (!message.guild.me.hasPermission("Administratorius", "Moderator","CO-Owner", "Unban (ADMIN)")) {

        return message.channel.send("Bot need Admin Permissions to setup the modmail system!")

      }





      let role = message.guild.roles.cache.find((x) => x.name == "Administratorius", "Moderator", "Unban (ADMIN)")

      let everyone = message.guild.roles.cache.find((x) => x.name == "@everyone")



      if (!role) {

        role = await message.guild.roles.create({

          data: {

            name: "Helper",

            color: "RED"

          },

          reason: "Role needed for ModMail System"

        })

      }



      await message.guild.channels.create("HELP Tickets", {

        type: "category",

        topic: "All the mail will be here",

        permissionOverwrites: [

          {

            id: role.id,

            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]

          },

          {

            id: everyone.id,

            deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]

          }

        ]

      })





      return message.channel.send("Setup is Completed ✅")



    } else if (command == "close") {

      if (!message.content.startsWith(prefix)) return;

      if (!message.member.roles.cache.find((x) => x.name == "Administratorius", "CO-Owner", "Moderator", "Unban (ADMIN) ")) {

        return message.channel.send("You need Administratorius,  Moderator,  Unban (ADMIN)  roles to use this command")

      }

      if (message.channel.parentID == message.guild.channels.cache.find((x) => x.name == "HELP Tickets").id) {



        const person = message.guild.members.cache.get(message.channel.name)



        if (!person) {

          return message.channel.send("I am Unable to close the channel and this error is coming because probaly channel name is changed.")

        }



        await message.channel.delete()



        let yembed = new discord.MessageEmbed()

          .setAuthor("🔰 Help ticket CLOSED 📪", client.user.displayAvatarURL())
          .setDescription("🖐️**Conversation is now ended, if you need help again you will have to contact Support team again**🖐️")
          .setImage('https://media3.giphy.com/media/2rAKTgJIQe1buYU1R5/giphy.gif?cid=ecf05e472ch9zjsj8957wa3rllay527wivjdtbiumq2a0frq&rid=giphy.gif&ct=g')




          .setColor("RED")

          .setThumbnail(client.user.displayAvatarURL())



        if (args[0]) yembed.setDescription(`Reason: ${args.join(" ")}`)



        return person.send(yembed)



      }

    } else if (command == "open") {

      if (!message.content.startsWith(prefix)) return;

      const category = message.guild.channels.cache.find((x) => x.name == "HELP Tickets")



      if (!category) {

        return message.channel.send("Moderation system is not setuped in this server, use " + prefix + "setup")

      }



      if (!message.member.roles.cache.find((x) => x.name == "Administratorius", "CO-Owner", "Moderator", "Unban (ADMIN)")) {

        return message.channel.send("You need Administratorius,  Moderator,  Unban (ADMIN) roles to use this command")

      }



      if (!(args[0])) {

        return message.channel.send("Please Give the 🆔 of the person")

      }



      const target = message.mentions.members.first();





      if (!target) {

        return message.channel.send("👀Unable to find this person.")

      }
      


      const channel = await message.guild.channels.create(target.id, {

        type: "text",

        parent: category.id,

        topic: "📬 Mail is Direct Opened by **" + message.author.username + "** to make contact with " + message.author.tag

      })



      let nembed = new discord.MessageEmbed()

        .setAuthor("DETAILS", target.user.displayAvatarURL({ dynamic: true }))

        .setColor("BLUE")

        .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))

        .setDescription(message.content)

        .addField("Name", target.user.username)

        .addField("Account Creation Date", target.user.createdAt)

        .addField("Person loking for support");



      channel.send(nembed)



      let uembed = new discord.MessageEmbed()

        .setAuthor("DIRECT MAIL OPENED")

        .setColor("GREEN")

        .setThumbnail(client.user.displayAvatarURL())

        .setDescription("You have been contacted by Support team of **" + message.guild.name + "**, Please wait until he send another message to you!");





      target.send(uembed);



      let newEmbed = new discord.MessageEmbed()

        .setDescription("Opened The Mail: <#" + channel + ">")

        .setColor("GREEN");



      return message.channel.send(newEmbed);

    } else if (command == "help") {

      if (!message.content.startsWith(prefix)) return;

      let embed = new discord.MessageEmbed()

        .setAuthor('MODMAIL INFORMATION')

        .addField("t?setup", "Setup the modmail system(This is not for multiple server.)", true)



        .addField("t?open", 'Let you open the mail to contact anyone with his ID', true)

        .setThumbnail(client.user.displayAvatarURL())

        .addField("t?close", "Close the mail in which you use this command.", true);



      return message.channel.send(embed)
      .then(msg => {
                msg.delete({ timeout: 15000 /*time unitl delete in milliseconds*/});
            })



    }

  }
  if (message.channel.parentID) {



    const category = message.guild.channels.cache.find((x) => x.name == "HELP Tickets")



    if (message.channel.parentID == category.id) {

      let member = message.guild.members.cache.get(message.channel.name)



      if (!member) return message.channel.send('Reikalingas nario ID')



      let lembed = new discord.MessageEmbed()

        .setColor("GREEN")

        .setAuthor("Support team", client.user.displayAvatarURL())

        .setDescription(message.content)



      return member.send(lembed)

    }





  }



  if (!message.guild) {

    const guild = await client.guilds.cache.get(ServerID) || await client.guilds.fetch(ServerID).catch(m => { })

    if (!guild) return;

    const category = guild.channels.cache.find((x) => x.name == "HELP Tickets")

    if (!category) return;

    const main = guild.channels.cache.find((x) => x.name == message.author.id)





    if (!main) {

      let mx = await guild.channels.create(message.author.id, {

        type: "text",

        parent: category.id,

        topic: "This mail is created for helping  **" + message.author.tag + " **"

      })



      let sembed = new discord.MessageEmbed()

        .setAuthor("🔓Help ticket Open")

        .setColor("GREEN")

        .setThumbnail(client.user.displayAvatarURL())

        .setDescription("🔔Conversation is now started, you will be contacted by Support team soon🔔")
        .setImage('https://media4.giphy.com/media/fdLR6LGwAiVNhGQNvf/giphy.gif?cid=ecf05e47ovm04goop9ajjl28ks81lpc8vqm9ko5a1ygonqir&rid=giphy.gif&ct=g')



      message.author.send(sembed)





      let eembed = new discord.MessageEmbed()

        .setAuthor("DETAILS", message.author.displayAvatarURL({ dynamic: true }))

        .setColor("BLUE")

        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))

        .setDescription(message.content)

        .addField("Name", message.author.username)
        .addField("ID", message.author.id)

        .addField("Account Creation Date", message.author.createdAt)

        .addField("✉️Direct Contact✉️", "🔍loking for help🔍")





      return mx.send(eembed)

    }



    let xembed = new discord.MessageEmbed()

      .setColor("RED")

      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

      .setDescription(message.content)





    main.send(xembed);
  }
  if (command) {
   
  };
});


const enmap = require('enmap');


const settings = new enmap({
  name: "settings",
  autoFetch: true,
  cloneLevel: "deep",
  fetchAll: true
});
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command == "ticket-setup") {
    // ticket-setup #channel

    let channel = message.mentions.channels.first();
    if (!channel) return message.reply("Usage: `!ticket-setup #channel`");

    let sent = await channel.send(new discord.MessageEmbed()
      .setAuthor("Fenix.lt", "https://i.ibb.co/WGTTZt3/giphy.gif")
      .setTitle("Support")
      .addFields({ name: "Lithuania",
      value:"🇱🇹 **Jei jus susidūrėte su problema ir negalite jos išspręsti tai rašykit čia ir mes pasistengsime jums padėti o jeigu jums reikia privačios pagalbos spauskite ant** --> 🎫"})
      .addFields({ name: "English",
      value:"🇬🇧 **if you have a problem and can't solve it, write here and we will try to help you and if you need private help click on** --> 🎫"})
      .addFields({ name: "Other method",
      value:"if the reaction not works then type __t?ticket__"})
                 .setFooter("Click one 🎫 to get private help", "https://i.ibb.co/WGTTZt3/giphy.gif")
      .setColor("00ff00")
      .setThumbnail("https://i.ibb.co/WGTTZt3/giphy.gif")
      .setTimestamp()
      .setImage('https://i.ibb.co/JtZgYqP/giphy-gif-cid-ecf05e47kax06v87gr21qpvd7ohzn1qvry57sb5b48ldgko2-rid-giphy.gif')
    );

    sent.react('🎫');
    settings.set(`${message.guild.id}-ticket`, sent.id);

    message.channel.send("Ticket System Setup Done!")
  }

  if (command == "close") {
    if (!message.channel.name.includes("ticket-")) return message.channel.send("You cannot use that here!")
    message.channel.delete();
  }
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (user.partial) await user.fetch();
  if (reaction.partial) await reaction.fetch();
  if (reaction.message.partial) await reaction.message.fetch();

  if (user.bot) return;

  let ticketid = await settings.get(`${reaction.message.guild.id}-ticket`);

  if (!ticketid) return;

  if (reaction.message.id == ticketid && reaction.emoji.name == '🎫') {
    reaction.users.remove(user);

    reaction.message.guild.channels.create(`ticket-${user.username}`, {
      permissionOverwrites: [
        {
          id: user.id,
          allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
        },
        {
          id: reaction.message.guild.roles.everyone,
          deny: ["VIEW_CHANNEL"]
        }
      ],
      type: 'text'
    }).then(async channel => {
      channel.send(`<@${user.id}>`, new discord.MessageEmbed()
      .setAuthor("Fenix.lt", "https://i.ibb.co/WGTTZt3/giphy.gif")
           .setTitle("Hello and welcome to private support").setDescription("We will reply to you as soon as possible dont beg for help :) ")
        .setTimestamp()
        .setImage('https://i.ibb.co/wph70RR/giphy-gif-cid-ecf05e47iu7z0mw095x84r7m5sfl8d7yslk82qot4321y8up-rid-giphy.gif')
        .setFooter("Wait for respond have some patience ","https://i.ibb.co/WGTTZt3/giphy.gif")
        .setColor("#3363FF"))
        

    })
  }
});


//schema  -----------------------------------------
 
client.ticketTranscript = mongoose.model('transcripts', 
    new mongoose.Schema({
        Channel : String,
        Content : Array
    })
)
// -------------------------------------------------

client.on('message', async(message) => {
    if(message.channel.parentID !== '863195212465045525') return;
    client.ticketTranscript.findOne({ Channel : message.channel.id }, async(err, data) => {
        if(err) throw err;
        if(data) {
           console.log('there is data')
           data.Content.push(`${message.author.tag} : ${message.content}`) 
        } else {
            console.log('there is no data')
            data = new client.ticketTranscript({ Channel : message.channel.id, Content: `${message.author.tag} : ${message.content}`})
        }
        await data.save()
            .catch(err =>  console.log(err))
        console.log('data is saved ')
    })

})







keepAlive();
client.login('ODE1MzQyOTA4NTAwNzM4MDQ5.YDrBQQ.ek0H_rjn1X8T-CESmbnmzRfY-CA').catch(err => console.log(`Invalid Token Provided!`))