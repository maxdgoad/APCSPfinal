var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var express = require('express');
var mgb = require( path.resolve( __dirname, "./memeGameBackend" ) );

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, '/')));

io.on('connection', function(socket){
    mgb.creategamex(io,socket);
  //console.log('a user connected');
});
    

http.listen(6969, function(){
  console.log('port 6969');
});
