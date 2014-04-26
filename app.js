//**Server side code for Game Jam Thing**//


//**Server Initialization**//
	var express = require('express');
	var app = express();

	app.use(express.static(__dirname + '/public')); 

	app.get('/', function(req, res){
	  res.render('index');
	});

	var server = app.listen(3000);

//**Sockets Stuff**//
	var socketio = require('socket.io');
	io = socketio.listen(server);

	//Say Hello to clients
	io.sockets.on('connection', function (socket) {
		socket.emit('serverTest', { msg: 'Server ACK' });

	});