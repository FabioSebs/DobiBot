// Discord Bot - Plays Audio On Message - Powered by JavaScript

// Imports
const Discord = require('discord.js')     //Discord Api Import
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
require('dotenv').config();  	//Dotenv Import
const textCommands = require('./textCommands')
let voiceIds = require('./voiceIds')
// Once DobiBot Connects
client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`)
})


//Handles any message commands
client.on("message", msg => {
	try {
		textCommands.dobiAudio(msg)
		textCommands.dobiGreeting(msg)
		textCommands.listCommands(msg)
		textCommands.dobiRank(msg)
		textCommands.showMatchHistory(msg)
	}

	catch (e) {
		console.error(e)
	}
	// msg.content === '!leave' ? voiceChannel.leave() : null
})

//Voice Channel States
client.on('voiceStateUpdate', (_, recent) => {
	console.log('User ID - \n' + recent)
	// let userId = voiceIds.Fabio.toString().slice(0, 13)
	let voiceId = recent.id.slice(0, 13)
	let dobiIntro = false;
	let userIntro = null;
	voiceIds.forEach(i => {
		if (i.id.toString().slice(0, 13) === voiceId) {
			dobiIntro = true;
			userIntro = i.intro;
		}
	})

	if (dobiIntro) {
		try {
			const channel = client.channels.cache.get(recent.channelID)
			channel.join()
				.then(connection => {
					const dispatcher = connection.play(userIntro)
					setTimeout(() => {
						channel.leave()
					}, 9000)
				})
				.then(x => {
					voiceIds = voiceIds.filter(i => i.id.toString().slice(0, 13) !== voiceId)
				})
			console.log(recent.channelID)
		} catch (error) {
			console.log("user has left")
		}

	}
})

// Logs DobiBot in
client.login(process.env.TOKEN)

