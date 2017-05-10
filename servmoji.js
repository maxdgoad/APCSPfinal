var express = require('express')
var path = require('path');
var server = require('http').createServer(app)
var app = express()
var folder = "/Users/maxmac/Documents/APCSPfinal";
//replace folder with the full path to your folder, remember to use \\ instead of / on windows
var index = "/index.html";
//replace with path to visualsman in the folder, replace with \\visualsman.html on windows

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + index));
});

app.use("APCSPfinal", express.static(folder));


app.listen(2222, function () {
  console.log(' moji server listening on port 2222')
});