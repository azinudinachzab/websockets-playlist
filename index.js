var express = require('express');
var socket = require('socket.io');
var app = express();
var cors = require('cors');

// App setup
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

const corsOptions = {
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'access-control-allow-origin', 'appname', 'portalname'],
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // preflightContinue: false
}

app.use(cors(corsOptions))
// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
