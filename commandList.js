// Command List for Dobi Bot

module.exports = class Commands {
	constructor(){
		this.commandList = []
	}
	
	addToList(command){
		this.commandList = this.commandList.concat(command)
	}
}
