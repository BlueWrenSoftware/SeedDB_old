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
				      // TODO: else here
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
    // TODO: Handle error in callback
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

app.get('/api/packets', function (request, response) {
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

app.get('/api/companies', function (request, response) {
    var db = new sqlite3.Database('db/bluewren.db');

    db.all('select * from Companies', function (err, rows) {
	if (err) {
	    console.log(err);
	    response.status(500).send("Server error.");
	    return;
	}

	response.send(rows);
    });
    db.close();
});

app.post('/api/seed', function (request, response) {
    request.accepts('application/json');

    var data = request.body;
    
    var db = new sqlite3.Database('db/bluewren.db');

    // TODO: serialize this
    
    // TODO: If seedId sent is null/undefined then we assume we're adding a new one.
    // This row checking shouldn't be necessary
    db.get('select seedId from Seeds where seedId = ?', data.seedId, function (err, row) {
	if (err) {
	    // TODO Return 500 error.
	    console.log(err);
	    
	    return;
	}

	if (row === undefined) {
	    // Insert new row
	    // TODO: serialize
	    var query =
		"insert into Seeds (" +
		"    seedVarietyName " +
		"    ,seedTypeId " +
		"    ,seedVarietyNote " +
	        " ) " +
		"values (" +
		"    ?, ?, ? " +
		") "
	    db.run(
		query,
		[data.seedVarietyName,
		 data.seedTypeId,
		 data.seedVarietyNote],
		function (err) {
		    if (err) console.log(err);
		});

	    db.get(
		"select * from Seeds where seedId in (" +
		    "select max(seedId) from Seeds)",
		function (err, row) {
		    if (err) {
			console.log(err);
			response.status(500).send("Server error");
			return
		    }
		    response.status(200).send(row)
		});
	    
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
		 data.seedTypeId,
		 data.seedVarietyNote,
		 data.seedId],
		function (err) {
		    if (err) console.log(err);
		});
	    
	    response.status(200).send('OK');
	}
	
	db.close();
    });

    
    
});

app.post('/api/packet', function (request, response) {
    request.accepts('application/json');

    var data = request.body;
    
    var db = new sqlite3.Database('db/bluewren.db');

    db.serialize(function() {
	if (data.packedId === null) {
	    // create new
	    var query =
		"insert into SeedPackets (" +
		"    packetCode " +
		"    ,seedId " +
		"    ,companyId " +
		"    ,datePurchased " +
		"    ,dateUseBy " +
		"    ,seedCount " +
		"    ,packetTreatment " +
		"    ,storageLocation " +
		") values ( " +
		" ?, ?, ?, ?, ?, ?, ?, ? " +
		")";

	    db.run(
		query,
		[data.packetCode,
		 data.seedId,
		 data.companyId,
		 data.datePurchased,
		 data.dateUseBy,
		 data.seedCount,
		 data.packetTreatment,
		 data.storageLocation],
		function (error) {
		    if (error) {
			console.log(error);
			response.status(500).send("Server error");
			return;
		    }
		});

	    db.get("select last_insert_rowid() as packetId", function (err, row) {
		if (err) {
		    console.log(err);
		    response.status(500).send("Server error");
		    return;
		}
		response.status(200).send(row);
	    });
	}
	else {
	    // update row
	    var query =
		"update SeedPackets set " +
                "     packetCode = ? " +
		"     ,seedId = ? " +
		"     ,companyId = ? " +
		"     ,datePurchased = ? " +
		"     ,dateUseBy = ? " +
		"     ,seedCount = ? " +
		"     ,packetTreatment = ? " +
		"     ,storageLocation = ? " +
		"where  " +
		"     packetId = ?";

	    db.run(
		query,
		[data.packetCode,
		 data.seedId,
		 data.companyId,
		 data.datePurchased,
		 data.dateUseBy,
		 data.seedCount,
		 data.packetTreatment,
		 data.storageLocation,
		 data.packedId],
		function (error) {
		    if (error) {
			console.log(error);
			response.status(500).send("Server error");
			return;
		    }
		});
	    
	    response.status(200).send('OK');
	}
    });
    
    db.close();
});
    


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
});
