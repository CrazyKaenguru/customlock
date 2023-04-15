const Discord = require("discord.js");
const fs = require('fs');


module.exports = {
    name: 'help',
    description: "this is a ping command!",
    execute(client, interaction){
        const helpEmbed = new Discord.EmbedBuilder()
.setTitle("All Commands:")
.setDescription(`
**/help**   to view all Commands!`)
.setColor('#ffff00')
        interaction.reply({embeds:[helpEmbed]})
    }
}