var express = require('express')
var path = require('path');
var server = require('http').createServer(app)
var app = express()

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '\\public\\index.html'));
});

app.use('/', express.static('F:\\APCSPfinal', {extensions: ['html', 'htm']
}));

app.use('/public', express.static('F:\\APCSPfinal\\public\\'))

app.listen(80, function () {
  console.log('listening on port 80')
})