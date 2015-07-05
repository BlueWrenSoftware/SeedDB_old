(function() {
    angular.module('seed-db').factory('DataService', ['$http', 'SeedType', 'Seed',  function ($http, SeedType, Seed) {
	return {
	    UpdateSeed: function(seed) {			
		$http.post('api/seed', seed.toRaw());
	    },
	    getSeedTypes: function() {
		return $http.get('api/seedtypes').then(
		    function(result) {
			var seedTypes = _.map(result.data, function (seedType) {
			    return new SeedType(seedType);
			});
			return seedTypes;
		    },
		    function (error) {
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
			// TODO: Do something here
		    });
	    }
	};
    }]);
})();
