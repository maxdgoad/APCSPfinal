var io;
var gameSocket;

// This function is called by index.js to initialize a new game instance.
//sio The Socket.IO library
//socket The socket object for the connected client.
 
exports.creategamex = function(sio, socket){
    io = sio;
    gameSocket = socket;
    gameSocket.emit('connected', { message: "You are connected!" });
    console.log("connected")

    // Host Events
    gameSocket.on('hostCreateNewGame', hostCreateNewGame);
    gameSocket.on('startGame', startGame);

    // Player Events
    gameSocket.on('playerJoinGame', playerJoinGame);
    gameSocket.on('playerAnswer', playerAnswer);

}

//host functions

function hostCreateNewGame(gameId) {
    // Create a unique Socket.IO Room
    var thisGameId = gameId;

    // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
    this.emit('newGameCreated', {gameId: thisGameId, mySocketId: this.id});

    // Join the Room and wait for the players(dont 100% know how this works)
    this.join(thisGameId.toString());
}

function startGame(gameId){
	console.log("Game has started");
	//sends socket io data to user needed for player join game function
	var data = {mySocketId : sock.id, gameId : gameId};
    //dont know how this works entirely but must have a beginNewGame function in memeGame.js
    io.sockets.in(data.gameId).emit('beginNewGame', data);
}

//player functions

function playerJoinGame(data){
	// A reference to the player's Socket.IO socket object
    var sock = this;
     // Look up the room ID in the Socket.IO manager object
    var room = gameSocket.manager.rooms["/" + data.gameId];
    //checks if room exists
    if( room != undefined ){
        // attach the socket id to the data object.
        data.mySocketId = sock.id;
		// Join the room
   		sock.join(data.gameId);
        // Emit an event notifying the clients that the player has joined the room.
        io.sockets.in(data.gameId).emit('playerJoinedRoom', data);
    }
    else {
        // sends an error message back to the player.
        this.emit('error',{message: "This room does not exist."} );
    }
}

function playerAnswer(data) {
    // The player's answer is attached to the data object
    // Emit an event with the answer so it can be checked by the 'Host'
    //must have a host check answer in memeGame.js
    io.sockets.in(data.gameId).emit('hostCheckAnswer', data);
}


