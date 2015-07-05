var express = require('express');
var sqlite3 = require('sqlite3');
var fs = require('fs');
var app = express();

/* Initialize database
 */
var db = null;
db = new sqlite3.Database('db/bluewren.db'
			  , sqlite3.OPEN_READWRITE
			  , function (err, openEvent) {
			      if (err) {
				  db = new sqlite3.Database('db/bluewren.db')
				  fs.readFile('db/CreateDB.sql', 'utf8', function (err, sql) {
				      if (err) console.log(err);
				      db.exec(sql);
				  });
			      }
			      
			  });
/*;*/
db.close();

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
});

app.get('/api/seedtypes', function (request, response) {
    var db = new sqlite3.Database('db/bluewren.db');
    db.all('select * from SeedTypes', function (err, rows) {
	if (err) {
	    console.log(err);
	    return;
	}
	console.log(rows);
	response.send(rows);
    });
    db.close();
});

app.get('/api/seedlist', function (request, response) {
    var db = new sqlite3.Database('db/bluewren.db');
    var data = [];
    db.each('select * from ViewSeedList',
	    function (err, row) {
		if (err) {
		    console.log(err);
		    return;
		}
		
		row.seedType = {seedTypeId: row.seedTypeId,
				seedTypeName: row.seedTypeName,
			        seedDescription: row.seedDescription};
		delete row.seedTypeId;
		delete row.seedTypeName;
		delete row.seedDescription;
		data = data.concat(row);
	    },
	    function (err, count) {
		response.send(data);
	    });
    db.close();
});

app.get('/api/packetlist', function (request, response) {
    var db = new sqlite3.Database('db/bluewren.db');
    console.log(request);
    db.all('select * from ViewPacketsList where seedId = ?', request.query.seedId, function (err, rows) {
	if (err) console.log(err);
	response.send(rows);
    });
    db.close();
});

app.use(express.static('frontend'));
