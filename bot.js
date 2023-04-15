const { Client, GatewayIntentBits } = require("discord.js");
const Discord = require("discord.js");
const prefix = "!";
require("dotenv").config();
const fs= require("fs")
const judge= require("./commands/judge")
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Bot is online!");
  client.user.setActivity("CustomLock", {
    type: "WATCHING",
   });

const guildID="958705753244467200"
const guild= client.guilds.cache.get(guildID)
let commands
if(guild&&process.env.localcommand=="true")
{
    commands=guild.commands
    console.log("Command: only test guild")
}
else
{
    commands=client.application?.commands
    console.log("Command: global")
}


commands?.create({
    name:"publish",
    description:"publish a module design to the website!!",
    options:[
      {
        name:"title",
          description:"title of the module!",
          required:true,
          type:Discord.ApplicationCommandOptionType.String,
          min_length:5,

      },
      {
        name:"short_description",
          description:"short description of the module!",
          required:true,
          type:Discord.ApplicationCommandOptionType.String,
          min_length:5,
      },
      {
        name:"long_description",
          description:"long description of the module!",
          required:true,
          type:Discord.ApplicationCommandOptionType.String,
        min_length:30,

      },
      {

        name:"file",
        description:"The 3d file!",
        required:true,
        type:Discord.ApplicationCommandOptionType.Attachment,
    },
    {
      name:"image",
      description:"title render images of the file!",
      required:true,
      type:Discord.ApplicationCommandOptionType.Attachment,
    },
    ]
})


});
client.on("interactionCreate",async (interaction)=>{
  console.log(interaction.type)
  const { commandName,options}=interaction
if(interaction.type === 2){
console.log("test")

    client.commands.get(commandName).execute(client,interaction,options);
}
    if (interaction.isStringSelectMenu())
    {

  judge.execute(client,interaction,options)
    }


})




client.login(process.env.token);