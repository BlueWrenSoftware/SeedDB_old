var express = require('express');
var sqlite3 = require('sqlite3');
var app = express();

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
});

app.get('/api/seedlist', function (request, response) {
	var db = new sqlite3.Database('db/bluewren.db');
	db.all('select st.seedTypeId, s.seedName, count(sb.batchId) as seedPacketCount, sum(sb.seedCount) as totalSeedCount ' +
		'from SeedTypes as st ' +
		'join Seeds as s ' +
		'on st.seedTypeId = s.seedTypeId ' +
		'join SeedBatches sb ' +
		'on s.seedId = sb.seedId ' +
		'group by st.seedTypeId, s.seedName', function (err, rows) {

		console.log(err);
		response.send(rows);
	});
	db.close();
});

app.use(express.static('frontend'));
