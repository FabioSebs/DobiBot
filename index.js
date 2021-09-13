// Discord Bot - Plays Audio On Message - Powered by JavaScript

// Imports
const Discord = require('discord.js')     //Discord Api Import
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]})
require('dotenv').config();  	//Dotenv Import
const path = require('path')
const audio = path.join(__dirname, 'DEONGODTOP.mp3')
const textCommands = require('./textCommands')
const { RiotValorantApi, Regions} = require("riot-valorant-api");

const valorantAPI = new RiotValorantApi(process.env.VALO_TOKEN)

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
	}
	
	catch(e) {
		console.error(e)
	}
	// msg.content === '!leave' ? voiceChannel.leave() : null
})


// Logs DobiBot in
client.login(process.env.TOKEN)

