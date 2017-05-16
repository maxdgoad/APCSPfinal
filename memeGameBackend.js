var io;
var gameSocket;

// This function is called by index.js to initialize a new game instance.
//sio The Socket.IO library
//socket The socket object for the connected client.
 
exports.createGame = function(sio, socket){
    io = sio;
    gameSocket = socket;
    gameSocket.emit('connected', { message: "You are connected!" });
    console.log("connected")
}

