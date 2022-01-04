# DOBI BOT 

This is a community Discord Bot for the infamous Goobers Discord Server. DobiBot is made on NodeJS and is capabale of text commands / valorant commands / and audio commands. This is DobiBot's documentation.

## Dependencies

```json
{
  "dependencies": {
    "@discordjs/opus": "discordjs/opus",
    "discord.js": "^12.5.3",
    "discord.js-commando": "^0.12.3",
    "dotenv": "^10.0.0",
    "riot-valorant-api": "^0.2.3"
  },
  "type": "commonjs"
}
```
---

## Connecting DobiBot to Discord

The way to connect DobiBot or let alone any discord bot to Discord is through the bot *Token*. The bot token can be found in [here](https://discord.com/developers/applications). 

```javascript
const Discord = require('discord.js')     //Discord Api Import
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
require('dotenv').config();  	//Dotenv Import

// This runs when DobiBot is connected
client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`)
})

// Logs DobiBot in
client.login(process.env.TOKEN)
```
---

## Text Commands with DobiBot

Alright now that DobiBot can connect to Discord we can give him some functionality. First things first we can make him to do text commands with the *.on()* function. We actually already have seen this function before when we ran the connection. 


```javascript
client.on("message", msg => {
    msg.channel.send("Hello!")
})
// DobiBot will send "Hello!" for any message recieved in the text channel
```
>Example ^^^

```javascript
client.on("message", msg => {
    if (msg.content === "!greeting") {
        msg.channel.send("Hello!")
    }
    // DobiBot will send "Hello!" for only a !greeting message in the text channel.
})
```
>Example ^^^

---

## Intro Music!

DobiBots power doesn't only range to text commands, it also does Voice Commands! For this to work we have to have ability to know WHO is joining the voice channel and what their music intro will be. The way I implemented this is by downloading local mp3 and wav files into my project and making a list of objects that contain the users ids and intro music

```javascript
// voiceIds.js

const path = require('path')
const FabioIntro = path.join(__dirname, './intros/FabioIntro.wav')
const DemetriIntro = path.join(__dirname, './intros/DemetriIntro.mp3')
const AntonioIntro = path.join(__dirname, './intros/Antonio2.mp3')
const TobinIntro = path.join(__dirname, './intros/TobinIntro.wav')

const ids = [
    {
        id: 799395962845134929,
        intro: FabioIntro
    },
    {
        id: 445064070820003850,
        intro: DemetriIntro
    },
    {
        id: 371424155288993802,
        intro: TobinIntro
    },
    {
        id: 404682107512946691,
        intro: AntonioIntro
    },
]

module.exports = ids;
```

Next we have to know WHEN someone joins a voice channel so we use the .on() function again since it acts like an event listener to discord server. When something in the voice channel changes the person who initiated the change will take form of the parameter

```javascript
let voiceIds = require('./voiceIds')

client.on('voiceStateUpdate', (old, recent) => {
    // Getting the user id and slicing it
    let voiceId = recent.id.slice(0, 10)

    let dobiIntro = false;  // True if User is in list and has an intro
	let userIntro = null;   // Takes value of the intro music 

    // Going through all the User IDs and comparing to User who initiated voice channel change
    voiceIds.forEach(i => {
		if (i.id.toString().slice(0, 13) === voiceId) {
			dobiIntro = true;
			userIntro = i.intro;
		}
	})

    if (dobiIntro) {
		try {
            // Gets the current voice channel they are in
			const channel = client.channels.cache.get(recent.channelID)

            //Joins Channel
			channel.join()
                // Plays the intro and leaves the channel after certain time
				.then(connection => {
					const dispatcher = connection.play(userIntro)
					setTimeout(() => {
						channel.leave()
					}, 9000)
				})
                // This makes sure to not make the intro repeat after another Voice Change
				.then(x => {
					voiceIds = voiceIds.filter(i => i.id.toString().slice(0, 13) !== voiceId)
				})
			console.log(recent.channelID)
		} catch (error) {
			console.log("user has left")
		}
	}
})
```