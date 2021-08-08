const { Client, Message } = require('discord.js')

module.exports = {
    name : 'ticket',
    /**
     * @param {Client} client
     * @param {Message} message
     */
    run : async(client, message) => {
        const ch = message.guild.channels.cache.find(ch => ch.name === message.author.id)
        if(ch) return message.channel.send('You already have a ticket open.').then(msg => {
                msg.delete({ timeout: 20000 /*time unitl delete in milliseconds*/});
            })
        message.guild.channels.create(`${message.author.username}`, {
            type : 'text',
            parent : '863195212465045525',
            permissionOverwrites : [
                {
                    id : message.guild.id,
                    deny : ['VIEW_CHANNEL']
                },
                {
                    id : message.author.id,
                    allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES']
                }
            ]
        }).then(async channel=> {
            message.reply(`click ➡️ <#${channel.id}> to view your ticket`).then(msg => {
                msg.delete({ timeout: 20000 /*time unitl delete in milliseconds*/});
            })
            channel.send({ embed: {
     color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.displayAvatarURL()
    },
    title: "This is private ticket",
    url: "http://google.com",
    description: "wait untill Admin respond to your ticket and read ticket rules",
    
    fields: [{
        name: "Ticket Rule :one:",
        value: "please do not mention the Administrator or Moderator but just wait for them to respond to your ticket", 
              },
      {
        name: "Ticket Rule :two:",
        value: "please don't spam in this channel and just wait"
      },
      {
        name: "Ticket Rule :three:",
        value: "please provide us all details about yours problem "
      },
      {
        name: "Be respectful",
      value: "If you brake any of this :three: rules your ticket will be closed"
      }
      
                ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.displayAvatarURL(),
      text: "Ticket will be closed be Administrator"
    }
  }
});
        })
    }
}

