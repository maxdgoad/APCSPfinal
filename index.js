var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var express = require('express');
var mgb = require( path.resolve( __dirname, "./memeGameBackend" ));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.static(path.join(__dirname, '/')));


io.on('connection', function(socket){
    mgb.creategamex(io, socket);
});

http.listen(6969, function(){
  console.log('port 6969');
});
