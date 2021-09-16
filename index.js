// Discord Bot - Plays Audio On Message - Powered by JavaScript

// Imports
const Discord = require('discord.js')     //Discord Api Import
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]})
require('dotenv').config();  	//Dotenv Import
const textCommands = require('./textCommands')


// Once DobiBot Connects
client.on("ready",()=>{
 console.log(`Logged in as ${client.user.tag}`)
})


//Handles any message commands
client.on("message", msg => {
	try{
		textCommands.dobiAudio(msg)
		textCommands.dobiGreeting(msg)
		textCommands.listCommands(msg)
		textCommands.dobiRank(msg)
		textCommands.showMatchHistory(msg)
	}
	
	catch(e) {
		console.error(e)
	}
	// msg.content === '!leave' ? voiceChannel.leave() : null
})

// Logs DobiBot in
client.login(process.env.TOKEN)

