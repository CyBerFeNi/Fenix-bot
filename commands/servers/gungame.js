const { MessageEmbed  } = require('discord.js');
const Gamedig = require('gamedig');

module.exports = {
    name: "gungame",
    category: "servers",
    description: "Server Status",
    usage: "gungame",
}

exports.run = (client, message, args) => {
    Gamedig.query({
        type: 'cs16',
        host: '185.80.128.244',
        port: '27016'
    }).then((state) => {
        console.log(state);
        let REmbed = new MessageEmbed()
        REmbed.setAuthor(`${state.name}`)
        REmbed.addField("Current map", `${state.map}`, true)
        REmbed.addField("Server IP", `${state.connect}`, true)
        REmbed.addField("Players", `👥${state.players.length}/${state.maxplayers}`, true)
        REmbed.addField("Status", `:green_circle:ONLINE`, true)
        message.channel.send(REmbed)
    }).catch((error) => {
        let REmbed = new MessageEmbed()
        console.log("Serveris Isjungtas");
        REmbed.setAuthor(`Server Is Offline`)
        REmbed.addField("Current map", `NaN`, true)
        REmbed.addField("Server IP", `185.80.128.244:27015`, true)
        REmbed.addField("Players", `👥NaN/NaN`, true)
        REmbed.addField("Status", `:red_circle:OFFLINE`, true)
        message.channel.send(REmbed)
    });
}