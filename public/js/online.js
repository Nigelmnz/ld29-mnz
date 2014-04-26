var online = {};
var socket;

online.connect = function(callback){
	socket = io.connect();
	socket.on("serverTest", function (data) {
		callback();
	});
}