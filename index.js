//Require in this context is a node.js function similar to importing a class in java or defining it in a script tag in an html webpage
// Import the Express module
var app = require('express')();
var express = require('express');
var path = require('path');
var server = require('http').Server(app);
// Create a Socket.IO server and attach it to the http server
var io = require('socket.io')(server);
//a Node.js based http server on port 6969
server.listen(6969);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

app.use(express.static(path.join(__dirname, '/public/')));
// Import the memeGameBackend game file.
var mgb = require('./memeGameBackend');
var game = require('./Game');


// Listen for Socket.IO Connections. Once connected, start the game logic.
io.sockets.on('connection', function (socket) {
    console.log('client connected');
    mgb.createGame(io, socket);
});


