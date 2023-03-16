
// const port = 20488;
// const port = 20281;

var net = require('net');
var server = net.createServer(function(socket) {
   socket.setEncoding('utf8');
   console.log('client connected: ' + socket.remoteAddress + ' : ' + socket.localPort/*.remotePort*/);

/*
   socket.on('end', function() {
      console.log('client disconnected');
   });
   socket.write('Hello World!\r\n');
   socket.pipe(socket);
*/

	var buffer,hash_expected,replened;

	var reset = function() {
		buffer = '';
		hash_expected = 6;
		replened = false;
	}
	reset();

	socket.on('data', function(data) {
		
		
		if (socket.localPort == 20488){ // TK110
			// console.log('str: ' + data.toString());	
			
			if(!data.includes("BP00HSO")) {
				var IMEI = data.substring (1,data.indexOf('B'));
				console.log('IMEI: ' + IMEI);
				var Nbound = data.substring(data.indexOf('A')+1,data.indexOf('N'));
				//console.log('Nbound: ' + Nbound);
				var Ebound = data.substring(data.indexOf('N')+2,data.indexOf('W'));
				//console.log('Ebound: ' + Ebound);
				// var latitude =  parseFloat(parseInt(Nbound.substring(0,2))+parseFloat(Nbound.substring(2,Nbound.length))/60).toFixed(5)
				var latitude = getDMS2DD(parseInt(Nbound.substring(0,2)),parseFloat(Nbound.substring(2,Nbound.length)),0,'N');
				console.log('latitude: ' + latitude);
				//var longitude =   parseFloat(parseInt(Ebound.substring(0,2))+parseFloat(Ebound.substring(2,Ebound.length))/60).toFixed(5)
				var longitude = getDMS2DD(parseInt(Ebound.substring(0,2)),parseFloat(Ebound.substring(2,Ebound.length)),0,'W');
				console.log('longitude: ' + longitude);
			}
		} else if (socket.localPort == 20281 && false ) { // GT06
			// console.log('ascii: ' + data.toString('ascii'));
			// console.log('hex: ', data.toString('hex'));
			
			var str = data.toString();

			for (var i = 0; i < str.length; i++) {
				var char = str.charAt(i);

				if (char == '#') {
					hash_expected--;
				}

				buffer += char;

				if (hash_expected == 0) {
					if (!replened) {
						hash_expected += (parseInt(str.charAt(i+1)) * 4) + 2;
						replened = true;
					}
					else {
						var split = buffer.split('#');

						var datum = {
							'imei'      : split[1],
							'data_type' : split[5],
							'points'    : [],						
						};

						for (var j = 0; j < parseInt(split[6]); j++) {
							offset = 6 + (j * 4);

							var loc_split = split[offset + 2].split(',');

							function date(part) {
								var date = split[offset + 3];

								return date.substring(part * 2, (part * 2) + 2);
							}
							function time(part) {
								var time = split[offset + 4];

								return time.substring(part * 2, (part * 2) + 2);
							}
							function convert_coord(coord, direction) {
								var dot = coord.indexOf('.');

								var deg = parseInt(coord.substring(0, dot - 2));
								var mins = parseFloat(coord.substring(dot - 2));

								return (deg + (mins / 60)) * ((direction == 'S' || direction == 'W') ? -1 : 1);
							}
							
							console.log("\n");
							
							console.log("type: " + split[offset + 1]);
							console.log("lon: " + convert_coord(loc_split[0], loc_split[1]));
							console.log("lat: " + convert_coord(loc_split[2], loc_split[3]));
							console.log("speed: " + parseFloat(loc_split[4]));
							console.log("direction: " + parseFloat(loc_split[5]));
							console.log("date: " + '20'+date(2)+'-'+date(1)+'-'+date(0));
							console.log("time: " + time(0)+':'+time(1)+':'+time(2));

							/*
							datum.points.push({
								'type'      : split[offset + 1],
								'lon'       : convert_coord(loc_split[0], loc_split[1]),
								'lat'       : convert_coord(loc_split[2], loc_split[3]),
								'speed'     : parseFloat(loc_split[4]),
								'direction' : parseFloat(loc_split[5]),
								'date'      : '20'+date(2)+'-'+date(1)+'-'+date(0),
								'time'      : time(0)+':'+time(1)+':'+time(2),
							});
							*/
							console.log("\n ------ \n");
						}
					}
				}
			}
		}
	});
	
	socket.on('end', function() {

	});

	socket.on('error', function(error) {

	});
});
server.listen(20488, function() {
   console.log('server is listening (' + 20488 + ')');
});
server.listen(20281, function() {
   console.log('server is listening (' + 20281 + ')');
});
// ddmm.mmmmmmN, ddmm.mmmmmmE
function getDMS2DD(days, minutes, seconds, direction) {
    direction.toUpperCase();
    var dd = days + minutes/60 + seconds/(60*60);
    //alert(dd);
    if (direction == "S" || direction == "W") {
        dd = dd*-1;
    } // Don't do anything for N or E
    return dd;
}
