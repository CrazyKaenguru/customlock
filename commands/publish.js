const Discord = require("discord.js");
const fs = require('fs');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events,StringSelectMenuBuilder } = require('discord.js');
var mongo = require('mongodb');
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');
  
require("dotenv").config();
const {MongoClient} = require('mongodb');
var url = "mongodb+srv://crazykngurucompany:test1@cluster0.ljuqb9o.mongodb.net/?retryWrites=true&w=majority";
module.exports = {
    name: 'publish',
    description: "this is a ping command!",
   async execute(client, interaction,options){
       var documentId
       const mgclient = new MongoClient(url);
              // console.log(fileData)
              const database = mgclient.db('mydb');
              const products = database.collection('products');
              const result =  products.insertOne({
                _id: uuidv1(),
                user: interaction.user,
                title: options.getString("title"),
                short_description: options.getString("short_description"),
                long_description: options.getString("long_description"),
                file: interaction.options.get('file').attachment.attachment,
                image: interaction.options.get('image').attachment.attachment,
                approved: false
            });
             documentId=await result.insertedId
           console.log((await result).insertedId)
          //  await products.insertOne({ stl: fileData })
           mgclient.close();
            
         
        const resEmbed = new Discord.EmbedBuilder()
.setTitle("We will now have a look at your design!")
.setDescription(`If the design meets the requeirements, it will be published to the website soon! \n We will keep you updated!`)
.setColor('#ffff00')
          interaction.reply({embeds:[resEmbed]})
          const row = new ActionRowBuilder()
          .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('Nothing selected')
                .addOptions(
                    {
                        label: '✅',
                        value: 'a'+(await result).insertedId,
                    },
                    {
                        label: '❌',
                        value: 'd'+(await result).insertedId,
                    },
                ),
          );
          const message= 
          
        `
        ---
        The User  ${interaction.user.username}  ${interaction.user} submitted a module!
        title:  ${options.getString("title")}
        short description:  ${options.getString("short_description")}
        long description:  ${options.getString("long_description")}
        file:  ${interaction.options.get('file').attachment.attachment}
        image:  ${interaction.options.get('image').attachment.attachment}
        id:  ${(await result).insertedId}
        ---                  `
          const reviewchannel = client.channels.cache.get(process.env.reviewchannel); 
         reviewchannel.send({ content: message, components: [row] });
        
      
    }
}