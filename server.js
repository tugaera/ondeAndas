
const port = 20488;

var net = require('net');
var server = net.createServer(function(connection) {
   console.log('client connected: ' + connection.remoteAddress);
/*
   connection.on('end', function() {
      console.log('client disconnected');
   });
   connection.write('Hello World!\r\n');
   connection.pipe(connection);
*/

	connection.on('data', function(data) {
		
		console.log('str: ' + data.toString());
	});
});
server.listen(port, function() {
   console.log('server is listening (' + port + ')');
});
