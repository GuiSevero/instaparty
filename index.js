var config = require('./app/config');
var app = require('./app');
var http = require('http');

var sv = http.createServer(app);
var io = require('socket.io').listen(sv);
io.set('log level', 1);
global.io = io;


sv.listen(config.port, function() {
    console.log("Listening on " + config.port);
});
