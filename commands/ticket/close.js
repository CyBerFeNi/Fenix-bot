const { Message, Client, MessageAttachment} = require('discord.js')
const fs = require('fs')

module.exports = {
    name : 'finito',
    /**
     * @param {Client} client
     * @param {Message} message
     */
    run : async(client, message) => {
        if(message.channel.parentID !== '863195212465045525') return message.channel.send('You can only use this command in a ticket!');
        const transcriptChannel = message.guild.channels.cache.get('713423412743241728')
        message.channel.send('Deleting ticket in 5 seconds.....')
        
        setTimeout(() => {
            message.channel.delete()
        },5000);
    }
    };
    

        

         
    

       
                       
     