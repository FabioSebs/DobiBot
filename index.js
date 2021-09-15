// Discord Bot - Plays Audio On Message - Powered by JavaScript

// Imports
const Discord = require('discord.js')     //Discord Api Import
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]})
require('dotenv').config();  	//Dotenv Import
const path = require('path')
const audio = path.join(__dirname, 'DEONGODTOP.mp3')
const textCommands = require('./textCommands')
const { RiotValorantApi, Regions, Locales, Queue } = require("riot-valorant-api");
const axios = require('axios');
const valorantAPI = new RiotValorantApi(process.env.VALO_TOKEN, Regions.NORTH_AMERICA)

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

//VALORANT CONTENT
const showValoData = async () => {
	const content = await valorantAPI.ContentV1.getAllContent(Locales.EN_US)
	console.log(content)
};

//GET LEADERBOARDS
const showLeaderboard = async () => {
	try {
		const leaderboard = await valorantAPI.RankedV1.getLeaderboardByAct("97b39124-46ce-8b55-8fd1-7cbf7ffe173f", size=20, startIndex = 0)
		console.log(leaderboard)
	} catch (error) {
		console.log(error)
	}
}

// showValoData()
showLeaderboard()

// Logs DobiBot in
client.login(process.env.TOKEN)

