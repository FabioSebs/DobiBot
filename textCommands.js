// Imports
const Discord = require('discord.js')     //Discord Api Import
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]})
require('dotenv').config();  	//Dotenv Import
const path = require('path')
const audio = path.join(__dirname, 'DEONGODTOP.mp3')

const dobiAudio = (msg) => {
    const voiceChannel = msg.member.voice.channel
    if (msg.content === "!dobi") {
        voiceChannel.join()
		.then((connection)=>{
			const dispatcher = connection.play(audio)
			setTimeout(()=>{
				voiceChannel.leave()
			}, 9500)
		})
		.catch(e=>console.log(e))
    }
}

const dobiGreeting = (msg) => {
    if(msg.content==='!dobiWelcome') {
        msg.reply("Hey whats up it's Deon Johnson!")
    } 
}

exports.dobiAudio = dobiAudio
exports.dobiGreeting = dobiGreeting