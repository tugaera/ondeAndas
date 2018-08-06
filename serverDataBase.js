var mysql = require('mysql');

var db  = mysql.createPool({
	host : config.host,
	database : config.database, 
	user : config.user,
	password : config.password,
	port : 3306,
	connectionLimit : 2
});

db.getConnection(function(err, conn) {
  if (err) { // Error Connecting
    console.log('error - getConnection: '+err);
    throw err;
  }
  // Insert new ROW
  conn.query('INSERT INTO onde(imei,latitude,longitude) VALUES("'+imei+'","'+latitude+'","'+longitude+'")', function(err, rows, fields) {
    if (err){ 
      console.log('error - query: '+err);
      throw err;}
    conn.release();
  });
});
