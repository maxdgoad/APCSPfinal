var io;
var gameSocket;
var gamelist = [];
var players = 0;
//const Game = require('./Game');
var sup;
var player;

// This function is called by index.js to initialize a new game instance.
//sio The Socket.IO library
//socket The socket object for the connected client.
 
exports.createGame = function(sio, socket)
{
    io = sio;
    gameSocket = socket;
    
    players++; 
    console.log(players);

    // Host Events
    gameSocket.on('hostCreateNewGame', hostCreateNewGame);
    gameSocket.on('startGame', startGame);
    gameSocket.on('disconnect', function(){players--; console.log(players);});
    gameSocket.on('getGames', giveGames);
    gameSocket.on('playerLeave', playerLeave);
    gameSocket.on("joinGame", joinGame)
    gameSocket.on("sendMsg", roomMsg);
    gameSocket.on("joinRoom", joinRoom)


    // Player Events
    gameSocket.on('playerJoinGame', playerJoinGame);
    gameSocket.on('playerAnswer', playerAnswer);
    
    

}


function roomMsg(msg, gId, name)
{
    console.log(Object.keys(io.sockets.sockets));
    io.sockets.in(gId).emit("getMsg", name, msg);
    
}

function giveGames(pId)
{
    
    io.to(pId).emit('returnGames', gamelist);

}



var Game = function(gameName, players, password){
    this.gameName = gameName;
    this.playernum = players;
    this.password = password;
    this.gameId = makeId();
    this.playerlist = [];
    
}

var Player = function(name, id)
{
    this.name = name;
    this.id = id;
    this.wins = 0;
    this.hand = [];
    this.judge = false;
}

var removeg = -1;
var removep = -1;

function playerLeave(game, player)
{
    //this is REAL oop
    //do you want to be a REAL race car driver 
    // removes player from playerlist of a game
    gameSocket.leave(game);
    if(gamelist.length > 0)
    {
        for(rep = 0; rep<gamelist.length; rep++)
        {
             if(game === gamelist[rep].gameId)   
                 removeg = rep;
        }

        for(rep2 = 0; rep2 < gamelist[removeg].playerlist.length; rep2++)
        {
             if(player === gamelist[removeg].playerlist[rep2].id)   
                 removep = rep2;
        }

        gamelist[removeg].playerlist.splice(removep, removep + 1);
        console.log(game + " " + player + " " + removeg + " " + removep)
        removeEmpty();
    }
  
}

function removeEmpty()
{
    for(rep = 0; rep<gamelist.length; rep++)
    {
        if(gamelist[rep].playerlist.length < 0)
            gamelist.splice(rep, rep+1);
    }
}

function joinRoom(gId)
{
    gameSocket.join(gId);
}

function joinGame(gId, name, pId)
{
  
   
    for(game in gamelist)
    {
        if(game.gameId === gId)
            sup = game;
    }
    
    player = new Player(name, pId);

    
    sup.playerlist.push(player);
    
    io.to(pId).emit('getGame', sup);
    io.to(pId).emit('getPlayer', player);
}

//host functions
function hostCreateNewGame(gameName, players, password, name, pId)
{
    
    // Create a unique Socket.IO Room
    sup = new Game(gameName, players, password);
    player = new Player(name, pId);
    
    sup.playerlist.push(player);
    gamelist.push(sup);
  
    
    io.to(pId).emit('getGame', sup);
    io.to(pId).emit('getPlayer', player);
    
    
    console.log("New game: id = " + gameName + " pw = " + password + " plnum = " + players);
    io.to(gameSocket.id).emit("reply", "New game: id = " + gameName + " pw = " + password + " plnum = " + players);
    
    
    //this.emit('newGameCreated', {gameId: thisGameId, mySocketId: this.id});
    //not sure if we need this rn -max
    
    
}

function startGame(gameName){
	console.log("Game has started");
	//sends socket io data to user needed for player join game function
	var data = {mySocketId : sock.id, gameName : gameName};
    //dont know how this works entirely but must have a beginNewGame function in memeGame.js
    io.sockets.in(data.gameName).emit('beginNewGame', data);
}

//player functions

function playerJoinGame(data)
{
	// A reference to the player's Socket.IO socket object
    var sock = this;
     // Look up the room ID in the Socket.IO manager object
    var room = gameSocket.manager.rooms["/" + data.gameName];
    //checks if room exists
    if( room != undefined ){
        // attach the socket id to the data object.
        data.mySocketId = sock.id;
		// Join the room
   		sock.join(data.gameName);
        // Emit an event notifying the clients that the player has joined the room.
        io.sockets.in(data.gameName).emit('playerJoinedRoom', data);
    }
    else {
        // sends an error message back to the player.
        this.emit('error',{message: "This room does not exist."} );
    }
}

function playerAnswer(data) 
{
    // The player's answer is attached to the data object
    // Emit an event with the answer so it can be checked by the 'Host'
    //must have a host check answer in memeGame.js
    io.sockets.in(data.gameName).emit('hostCheckAnswer', data);
}

function makeId()
{
    //https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 20; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

