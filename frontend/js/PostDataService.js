(function() {
    angular.module('seed-db').factory('PostDataService', ['$http', function ($http) {
	return {
	    createOrUpdateSeed: function(seedData) {		
		return $http.post('api/seed', seedData).then(function (response) {
		    return response.data;
		});
	    },
	    createOrUpdatePacket: function(packetData) {
		return $http.post('api/packet', packetData).then(function (response) {
		    console.log(response.data);
		    return response.data;
		});
	    }
	};
    }]);
})();
