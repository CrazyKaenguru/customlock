const Discord = require("discord.js");
const fs = require('fs');
const {MongoClient} = require('mongodb');
var url = "mongodb+srv://crazykngurucompany:test1@cluster0.ljuqb9o.mongodb.net/?retryWrites=true&w=majority";
module.exports = {
    name: 'judge',
    description: "this is a ping command!",
   async execute(client, interaction,options){
        const helpEmbed = new Discord.EmbedBuilder()
.setTitle("All Commands:")
.setDescription(`
**/help**   to view all Commands!`)
.setColor('#ffff00')
const interactionidraw=(interaction.values[0]).toString()
const interactionid=interactionidraw.slice(1)
console.log(interactionid)
if(interactionidraw[0]=="a")
{
    interaction.reply({content:"The module will now be published to the website!"})
    const mgclient = new MongoClient(url);
              // console.log(fileData)
              const database = mgclient.db('mydb');
              const products = database.collection('products');
              const result =  products.updateOne({_id:interactionid},{ $set: { approved: true } })
              
            
            
          //  await products.insertOne({ stl: fileData })
           mgclient.close();
}
else
{
    interaction.reply({content:"The module will now not be published to the website!"})
    const mgclient = new MongoClient(url);
              // console.log(fileData)
              const database = mgclient.db('mydb');
              const products = database.collection('products');
              const result =  products.updateOne({_id:interactionid},{ $set: { approved: false } })
              
            
            
          //  await products.insertOne({ stl: fileData })
           mgclient.close();
}
       
    
}
}