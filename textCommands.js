// Imports
const Discord = require('discord.js')     //Discord Api Import
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]})
require('dotenv').config();  	//Dotenv Import
const path = require('path')
const audio1 = path.join(__dirname, 'DEONGODTOP.mp3')
const audio2 = path.join(__dirname,'DEONDEFUSE.mp3')
const audio3 = path.join(__dirname, 'DEONWEEB.mp3')
const audio4 = path.join(__dirname, 'DARKKASUE1.mp3')
let commandList;


const listCommands = (msg) => {
	[...commandList] = ['!dobi', '!dobiDefuse', '!dobiWelcome', '!dobiCommands']
	if (msg.content === '!dobiCommands') {
		commandList.forEach(i => {
			msg.reply(i)
		})
	} 
}

const dobiAudio = (msg) => { 
	
    const voiceChannel = msg.member.voice.channel
    if (msg.content === "!dobi") {
        voiceChannel.join()
		.then((connection)=>{
			const dispatcher = connection.play(audio1)
			setTimeout(()=>{
				voiceChannel.leave()
			}, 9500)
		})
		.catch(e=>console.log(e))
    }
    if (msg.content === '!dobiDefuse') {
	    voiceChannel.join()
	    .then((connection)=> {
		    const dispatcher = connection.play(audio2)
		    setTimeout(()=> {
			    voiceChannel.leave()
		    }, 4000)
	    })
	    .catch(e=>console.log(e))
    }

	if (msg.content === '!dobiWeeb') {
	    voiceChannel.join()
	    .then((connection)=> {
		    const dispatcher = connection.play(audio3)
		    setTimeout(()=> {
			    voiceChannel.leave()
		    }, 17500)
	    })
	    .catch(e=>console.log(e))
    }

	if (msg.content === '!dobiKasue') {
	    voiceChannel.join()
	    .then((connection)=> {
		    const dispatcher = connection.play(audio4)
		    setTimeout(()=> {
			    voiceChannel.leave()
		    }, 5000)
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
exports.listCommands = listCommands
