/**
 * Required Stuff
 */

 const db = require("quick.db")
 const { CanvasSenpai } = require("canvas-senpai")
 const canva = new CanvasSenpai();
 const discord = require("discord.js")
 
 
 /**
  * @param {Object} [client]
  * @param {Object} [member]
  */
 
 module.exports.run = async (client, member) => {
   const ChannelID = db.get(`welchannel_${member.guild.id}`); 
   if(!ChannelID) return;
   let data = await canva.welcome(member, { link: "https://i.ibb.co/MZyG8ys/oldest-galaxy-in-the-Universe.png" })
   client.channels.cache.get(ChannelID).send("Welcome to our Server " + member.user.username, new discord.MessageAttachment(data, "welcome-image.png"));
 }
 
 