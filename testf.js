var express = require('express')
var path = require('path');
var server = require('http').createServer(app)
var app = express()

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '\\index.html'));
});

app.use('/', express.static('F:\\APCSPfinal\\public', {extensions: ['html', 'htm']
}));



app.listen(2222, function () {
  console.log('listening on port 2222')
})