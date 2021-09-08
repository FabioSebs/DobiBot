// Discord Bot - Plays Audio On Message - Powered by JavaScript
//
// Imports
const Discord = require('discord.js')     //Discord Api Import
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]})
require('dotenv').config();  	//Dotenv Import

client.on("ready",()=>{
	console.log(`Logged in as ${client.user.tag}`)
})

client.on("message", msg => {
	const voiceChannel = msg.member.voice.channel

	if (msg.content === '!dobi'){
		voiceChannel.join()
		.then((connection)=>{
			
		})
		.catch(e=>console.log(e))
	}

	msg.content === '!leave' ? voiceChannel.leave() : null
})

client.login(process.env.TOKEN)

