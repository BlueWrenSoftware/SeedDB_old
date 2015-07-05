(function() {
    angular.module('seed-db').controller('packetlistCtrl', function ($scope, $http, $stateParams) {
	$scope.vm = {};
	config = {
	    params: {
		seedId:$stateParams.seedId
	    }
	};
	$http.get('/api/packetlist', config).success(function(data) {
	    $scope.vm.packetArray = data;
	});
    });
})();
