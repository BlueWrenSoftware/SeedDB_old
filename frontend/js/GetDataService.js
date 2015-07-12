(function() {
    angular.module('seed-db').factory('GetDataService', ['$http', 'SeedType', 'Seed', 'Company', 'Packet',  function ($http, SeedType, Seed, Company, Packet) {
	return {
	    getSeedTypes: function() {
		return $http.get('api/seedtypes').then(
		    function(result) {
			var seedTypes = _.map(result.data, function (seedType) {
			    return new SeedType(seedType);
			});
			return seedTypes;
		    },
		    function (error) {
			console.log(error);
		    });
	    },
	    getSeeds: function() {
		return $http.get('api/seedlist').then(
		    function(result) {
			var seeds = _.map(result.data, function (seed) {
			    return new Seed(seed);
			});
			return seeds;
		    },
		    function (error) {
			console.log(error);
			// TODO: Do something here
		    });
	    },
	    getSeed: function(seedId) {
		return $http.get('api/seed').then(
		    function (result) {
			return new Seed(result.data);
		    },
		    function (error) {
			console.log(error);
			// TODO: something here
		    })
	    },
	    getPackets: function(seedId) {
		var config = {params: {seedId: seedId}};
		return $http.get('api/packets', config).then(
		    function (result) {
			var packets = _.map(result.data, function (packet) {
			    return new Packet(packet);
			});
			return packets;
		    },
		    function (error) {
			console.log(error);
			// TODO: Display an error page
		    });
	    },
	    getCompanies: function () {
		return $http.get('api/companies').then(
		    function (result) {
			var companies = _.map(result.data, function (company) {
			    return new Company(company);
			});
			return companies;
		    },
		    function (error) {
			console.log(error);
			// TODO: Display an error page.
		    });
	    }
	};
    }]);
})();
