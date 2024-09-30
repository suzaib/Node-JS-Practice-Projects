const { Client, GatewayIntentBits}=require("discord.js");

const client=new Client({
    intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent],
});

client.on("messageCreate",(message)=>{
    if(message.author.bot){
        return
    }

    if(message.content.startsWith("create")){
        const url=message.content.split("create")[1];
        return message.reply({
            content:"Generating Short ID for "+url,
        })
    }
    message.reply({
        content:"Hi from Bot",
    })
})

client.login("MTI3Mjg0NzM5NTM2NTA2NDcwNA.GX6BL-.pD9F8Gw0XN73pf0m1VOAz2feSJRLXrouQojimo")

client.on("interactionCreate",(interaction)=>{
    console.log(interaction);
    interaction.reply("Pong");
})