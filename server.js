var express = require('express');
var sqlite3 = require('sqlite3');
var fs = require('fs');
var bodyParser = require('body-parser');
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

app.use(express.static('frontend'));

app.use(bodyParser.json());

app.get('/api/seedtypes', function (request, response) {
    var db = new sqlite3.Database('db/bluewren.db');
    db.all('select * from SeedTypes', function (err, rows) {
	if (err) {
	    console.log(err);
	    db.close();
	    return;
	}

	response.send(rows);
    });
    db.close();
});

app.get('/api/seedlist', function (request, response) {
    var db = new sqlite3.Database('db/bluewren.db');
    
    db.all('select * from ViewSeedList',
	    function (err, rows) {
		if (err) {
		    console.log(err);
		    
		    return;
		}
		
		response.send(rows);
	    });
    db.close();
});

app.get('/api/packetlist', function (request, response) {
    var db = new sqlite3.Database('db/bluewren.db');
    
    db.all('select * from ViewPacketsList where seedId = ?', request.query.seedId, function (err, rows) {
	if (err) {
	    console.log(err);
	    
	    return;
	}
	response.send(rows);
    });
    db.close();
});

app.post('/api/seed', function (request, response) {
    request.accepts('application/json');

    var data = request.body;
    console.log(data);
    var db = new sqlite3.Database('db/bluewren.db');
    db.get('select seedId from Seeds where seedId = ?', data.seedId, function (err, row) {
	if (err) {
	    console.log(err);
	    
	    return;
	}

	if (row === undefined) {
	    // Insert new row
	    console.log("Does not exist.")
	}
	else {
	    // update row
	    var query =
		"update Seeds " +
		"set seedVarietyName = ? " +
		",seedTypeId = ? " +
		",seedVarietyNote = ? " +
		"where seedId = ?";
	    
	    db.run(
		query,
		[data.seedVarietyName,
		 data.seedType.seedTypeId,
		 data.seedVarietyNote,
		 data.seedId],
		function (err) {
		    if (err) console.log(err);
		});

	    db.close();

	    
	}
    });

	
    response.status(200).send('OK');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
});
