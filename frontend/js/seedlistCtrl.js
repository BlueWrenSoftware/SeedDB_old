(function() {
	angular.module('seed-db').controller('seedlistCtrl', function ($scope, $http) {
		$scope.vm = {};
		$http.get('/api/seedlist').success(function(data) {
			console.log(data);
			$scope.vm.seedArray = data;
		});
	});
})();
