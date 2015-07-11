(function() {
    angular.module('seed-db').factory('PostDataService', ['$http', function ($http) {
	return {
	    createOrUpdateSeed: function(seedData) {		
		return $http.post('api/seed', seedData).then(function (response) {
		    return response.data;
		});
	    }
	};
    }]);
})();
