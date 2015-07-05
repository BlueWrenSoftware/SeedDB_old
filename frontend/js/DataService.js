(function() {
    angular.module('seed-db').factory('DataService', ['$http', function ($http) {
	return {
	    UpdateSeed: function(seed) {
		console.log(seed);
	
		$http.post('api/seed', seed);
	    }
	};
    }]);
})();
