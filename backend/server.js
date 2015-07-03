var http = require('http');
var url = require('url');
var router = require('./router.js');
var sqlite3 = require('sqlite3');

var getseedlist = function () {
	var db = new sqlite3.Database('
	return [{seedTypeName: "flower",
		seedVarietyName: "petunia",
		totalSeedCount: 10,
		seedPacketCount: 2}];
	
}

router.defineRoute('/api/seedlist', 'GET', getseedlist);

var server = http.createServer(function (request, response) {
	var parsedUrl = url.parse(request.url, true);
	var route = router.getRoute(parsedUrl.pathname, request.method);
	var data = JSON.stringify(route(parsedUrl.query));
	response.end(data);
});

server.listen(9000);
