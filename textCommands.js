// Imports
const Discord = require('discord.js')     //Discord Api Import
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
require('dotenv').config();  	//Dotenv Import
const path = require('path')
const audio1 = path.join(__dirname, 'DEONGODTOP.mp3')
const audio2 = path.join(__dirname, 'DEONDEFUSE.mp3')
const audio3 = path.join(__dirname, 'DARKKASUE1.mp3')
const audio5 = path.join(__dirname, "ANDREWRAGE.mp3")
const audioList = [audio1, audio2, audio3, audio5]
const axios = require('axios');
const players = require('./players');
const { kill } = require('process');

//Command List 
const listCommands = (msg) => {
	const commandList = ['!dobiDefuse', '!dobiWelcome', '!dobiCommands', '!dobiFatWomen', '!dobi', '!dobiKasue', '!dobiRandom', '!dobiRank{name}']
	if (msg.content === '!dobiCommands') {
		commandList.forEach(i => {
			msg.channel.send(`-${i}`)
		})
	}
}

//VALORANT CONTENT
const showValoData = async () => {
	const content = await axios.get('https://api.henrikdev.xyz/valorant/v1/content')
	console.log(content.data.Seasons)
};

//GET LEADERBOARD POSITION
const showRank = async () => {
	try {
		const rank = await axios.get('https://api.henrikdev.xyz/valorant/v1/mmr/NA/Fabrzy/TTTV')
		//Variables
		const name = rank.data.data.name
		const tag = rank.data.data.tag
		const placement = rank.data.data.currenttierpatched
		const elo = rank.data.data.elo
		console.log(`${name}#${tag} - ${placement} ${elo}`)
	} catch (error) {
		console.log(error)
		return error
	}
}

// Voice Commands
const dobiAudio = (msg) => {
	const voiceChannel = msg.member.voice.channel
	if (msg.content === "!dobi") {
		voiceChannel.join()
			.then((connection) => {
				const dispatcher = connection.play(audio1)
				setTimeout(() => {
					voiceChannel.leave()
				}, 9500)
			})
			.catch(e => console.log(e))
	}
	if (msg.content === '!dobiDefuse') {
		voiceChannel.join()
			.then((connection) => {
				const dispatcher = connection.play(audio2)
				setTimeout(() => {
					voiceChannel.leave()
				}, 4000)
			})
			.catch(e => console.log(e))
	}

	if (msg.content === '!dobiKasue') {
		voiceChannel.join()
			.then((connection) => {
				const dispatcher = connection.play(audio3)
				setTimeout(() => {
					voiceChannel.leave()
				}, 17500)
			})
			.catch(e => console.log(e))
	}

	if (msg.content === '!dobiFatWomen') {
		voiceChannel.join()
			.then(connection => {
				const dispatcher = connection.play(audio5)
				setTimeout(() => {
					voiceChannel.leave()
				}, 4000)
			})
	}

	if (msg.content === '!dobiRandom') {
		voiceChannel.join()
			.then(connection => {
				const randomVideo = Math.floor(Math.random() * audioList.length)
				const dispatcher = connection.play(audioList[randomVideo])
				setTimeout(() => {
					voiceChannel.leave()
				}, 17500)
			})
	}
}

// Introducing DobiBot
const dobiGreeting = (msg) => {
	if (msg.content === '!dobiWelcome') {
		msg.reply("Hey whats up it's Deon Johnson!")
	}
}

// Show Person's Rank
const dobiRank = async (msg) => {
	if (msg.content === '!dobiRankFabrzy') {
		try {
			const rank = await axios.get(`https://api.henrikdev.xyz/valorant/v1/mmr/NA/${players.Fabio.name}/${players.Fabio.tag}`)
			//Variables
			const placement = rank.data.data.currenttierpatched
			const elo = rank.data.data.elo
			msg.channel.send(`${players.Fabio.name}#${players.Fabio.tag} - ${placement} elo: ${elo}`)
		} catch (error) {
			console.log(error)
			return error
		}
	}
	if (msg.content === '!dobiRankMatoose') {
		try {
			const rank = await axios.get(`https://api.henrikdev.xyz/valorant/v1/mmr/NA/${players.Mateus.name}/${players.Mateus.tag}`)
			//Variables
			const placement = rank.data.data.currenttierpatched
			const elo = rank.data.data.elo
			msg.channel.send(`${players.Mateus.name}#${players.Mateus.tag} - ${placement} Elo: ${elo}`)
		} catch (error) {
			console.log(error)
			return error
		}
	}
	if (msg.content === '!dobiRankJody') {
		try {
			const rank = await axios.get(`https://api.henrikdev.xyz/valorant/v1/mmr/NA/${players.Jodel.name}/${players.Jodel.tag}`)
			//Variables
			const placement = rank.data.data.currenttierpatched
			const elo = rank.data.data.elo
			msg.channel.send(`${players.Jodel.name}#${players.Jodel.tag} - ${placement} Elo: ${elo}`)
		} catch (error) {
			console.log(error)
			return error
		}
	}
	if (msg.content === '!dobiRankSantos') {
		try {
			const rank = await axios.get(`https://api.henrikdev.xyz/valorant/v1/mmr/NA/${players.Frankie.name}/${players.Frankie.tag}`)
			//Variables
			const placement = rank.data.data.currenttierpatched
			const elo = rank.data.data.elo
			msg.channel.send(`${players.Frankie.name}#${players.Frankie.tag} - ${placement} Elo: ${elo}`)
		} catch (error) {
			console.log(error)
			return error
		}
	}
	if (msg.content === '!dobiRankMex') {
		try {
			const rank = await axios.get(`https://api.henrikdev.xyz/valorant/v1/mmr/NA/${players.Antonio.name}/${players.Antonio.tag}`)
			//Variables
			const placement = rank.data.data.currenttierpatched
			const elo = rank.data.data.elo
			msg.channel.send(`${players.Antonio.name}#${players.Antonio.tag} - ${placement} Elo: ${elo}`)
		} catch (error) {
			console.log(error)
			return error
		}
	}

}

const showMatchHistory = async (msg) => {
	if (msg.content === '!dobiMHFab') {
		try {
			const match = await axios.get(`https://api.henrikdev.xyz/valorant/v3/matches/NA/${players.Fabio.name}/${players.Fabio.tag}`)
			// console.log(match.data.data[0].teams)
			let matchStats = match.data.data[0].players.all_players
			let character, kills, deaths, assists, team, hasWon;
			matchStats.forEach((i)=>{
				if(i.name === players.Fabio.name){
					character = i.character
					kills = i.stats.kills
					deaths = i.stats.deaths
					assists = i.stats.assists
					team = i.team.toLowerCase()
				}
			})
			
			let teamWon = match.data.data[0].teams

			teamWon.red.has_won ? teamWon = 'red' : teamWon = 'blue'

			if (team === teamWon) {
				hasWon = "WON"
			}
			else { hasWon = "LOST" }

			msg.channel.send(`${players.Fabio.name}'s Last Game \n Game: ${hasWon} , KDA - ${kills}/${deaths}/${assists}`)

		} catch (error) {
			console.log(error)
		}
	}

	if (msg.content === '!dobiMHMatoose') {
		try {
			const match = await axios.get(`https://api.henrikdev.xyz/valorant/v3/matches/NA/${players.Mateus.name}/${players.Mateus.tag}`)
			// console.log(match.data.data[0].teams)
			let matchStats = match.data.data[0].players.all_players
			let character, kills, deaths, assists, team, hasWon;
			matchStats.forEach((i)=>{
				if(i.name === players.Mateus.name){
					character = i.character
					kills = i.stats.kills
					deaths = i.stats.deaths
					assists = i.stats.assists
					team = i.team.toLowerCase()
				}
			})
			
			let teamWon = match.data.data[0].teams

			teamWon.red.has_won ? teamWon = 'red' : teamWon = 'blue'

			if (team === teamWon) {
				hasWon = "WON"
			}
			else { hasWon = "LOST" }

			msg.channel.send(`${players.Mateus.name}'s Last Game \n Game: ${hasWon} , KDA - ${kills}/${deaths}/${assists}`)

		} catch (error) {
			console.log(error)
		}
	}

	if (msg.content === '!dobiMHFrank') {
		try {
			const match = await axios.get(`https://api.henrikdev.xyz/valorant/v3/matches/NA/${players.Frankie.name}/${players.Frankie.tag}`)
			// console.log(match.data.data[0].teams)
			let matchStats = match.data.data[0].players.all_players
			let character, kills, deaths, assists, team, hasWon;
			matchStats.forEach((i)=>{
				if(i.name === players.Frankie.name){
					character = i.character
					kills = i.stats.kills
					deaths = i.stats.deaths
					assists = i.stats.assists
					team = i.team.toLowerCase()
				}
			})
			
			let teamWon = match.data.data[0].teams

			teamWon.red.has_won ? teamWon = 'red' : teamWon = 'blue'

			if (team === teamWon) {
				hasWon = "WON"
			}
			else { hasWon = "LOST" }

			msg.channel.send(`${players.Frankie.name}'s Last Game \n Game: ${hasWon} , KDA - ${kills}/${deaths}/${assists}`)

		} catch (error) {
			console.log(error)
		}
	}

	if (msg.content === '!dobiMHJody') {
		try {
			const match = await axios.get(`https://api.henrikdev.xyz/valorant/v3/matches/NA/${players.Jodel.name}/${players.Jodel.tag}`)
			// console.log(match.data.data[0].teams)
			let matchStats = match.data.data[0].players.all_players
			let character, kills, deaths, assists, team, hasWon;
			matchStats.forEach((i)=>{
				if(i.name === players.Jodel.name){
					character = i.character
					kills = i.stats.kills
					deaths = i.stats.deaths
					assists = i.stats.assists
					team = i.team.toLowerCase()
				}
			})
			
			let teamWon = match.data.data[0].teams

			teamWon.red.has_won ? teamWon = 'red' : teamWon = 'blue'

			if (team === teamWon) {
				hasWon = "WON"
			}
			else { hasWon = "LOST" }

			msg.channel.send(`${players.Jodel.name}'s Last Game \n Game: ${hasWon} , KDA - ${kills}/${deaths}/${assists}`)

		} catch (error) {
			console.log(error)
		}
	}
	if (msg.content === '!dobiMHMex') {
		try {
			const match = await axios.get(`https://api.henrikdev.xyz/valorant/v3/matches/NA/${players.Antonio.name}/${players.Antonio.tag}`)
			// console.log(match.data.data[0].teams)
			let matchStats = match.data.data[0].players.all_players
			let character, kills, deaths, assists, team, hasWon;
			matchStats.forEach((i)=>{
				if(i.name === players.Antonio.name){
					character = i.character
					kills = i.stats.kills
					deaths = i.stats.deaths
					assists = i.stats.assists
					team = i.team.toLowerCase()
				}
			})
			
			let teamWon = match.data.data[0].teams

			teamWon.red.has_won ? teamWon = 'red' : teamWon = 'blue'

			if (team === teamWon) {
				hasWon = "WON"
			}
			else { hasWon = "LOST" }

			msg.channel.send(`${players.Antonio.name}'s Last Game \n Game: ${hasWon} , KDA - ${kills}/${deaths}/${assists}`)

		} catch (error) {
			console.log(error)
		}
	}
}

exports.dobiAudio = dobiAudio
exports.dobiGreeting = dobiGreeting
exports.listCommands = listCommands
exports.dobiRank = dobiRank
exports.showMatchHistory = showMatchHistory