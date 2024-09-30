const { REST, Routes}=require("discord.js");

const commands=[
    {
        name:"ping",
        description:"Replies with Pong!",
    },
];

const rest=new REST({version:"10"}).setToken(
    "MTI3Mjg0NzM5NTM2NTA2NDcwNA.GX6BL-.pD9F8Gw0XN73pf0m1VOAz2feSJRLXrouQojimo"
);

(async ()=>{
    try{
        console.log("Started refreshing application (/) commands");

        await rest.put(Routes.applicationCommands("1272847395365064704"),{body:commands});

        console.log("Successfully reloaded application(/) commands.");
    }
    catch(error){
        console.log(error);
    }
})();

