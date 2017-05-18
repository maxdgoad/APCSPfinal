//Require in this context is a node.js function similar to importing a class in java or defining it in a script tag in an html webpage
// Import the Express module
var express = require('express');

// Import the path module (packaged with Node.js)
var path = require('path');

// Create a new instance of Express
var app = express();

// Create a simple Express application

    // Turn down the logging activity
    //Dont really know how this works just read online to do this way to obtain less met data about user
    // Serve static html, js, css, and image files from the public 
    app.use(express.static(path.join(__dirname,'public')));

// Create a Node.js based http server on port 6969
var server = require('http').createServer(app).listen(6969);
console.log("what on 6969");

// Create a Socket.IO server and attach it to the http server
var io = require('socket.io').listen(server);

// Import the memeGameBackend game file.
var mgb = require('./memeGameBackend');

// Listen for Socket.IO Connections. Once connected, start the game logic.
io.sockets.on('connection', function (socket) {
    //console.log('client connected');
    mgb.createGame(io, socket);
    console.log("what");
});

