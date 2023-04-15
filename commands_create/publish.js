const Discord = require("discord.js");


module.exports = {
    name: 'publish',
    description: "this is a ping command!",
    execute(commands){
        console.log("test")
        commands?.create({
            name:"publish",
            description:"publish a module design to the website!",
            options:[
                {
                    name:"test",
                    description:"tttt!",
                    required:true,
                    type:Discord.ApplicationCommandOptionType.String,
                },
            ]
            
        })
    }
}