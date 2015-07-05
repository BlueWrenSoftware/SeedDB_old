(function() {
    angular.module('seed-db').controller('seedlistCtrl', ['$scope', 'seedlist', 'seedtypes', 'DataService',  function ($scope, seedlist, seedtypes, DataService) {

	$scope.vm = {}
	$scope.vm.seedArray = seedlist.data;
	$scope.vm.seedTypes = seedtypes.data;
	console.log($scope.vm.seedTypes);
	console.log($scope.vm.seedArray);
	
	for (var i = 0; i < $scope.vm.seedArray.length; i++) {
	    $scope.vm.seedArray[i].isEditing = false;
	};

	$scope.vm.toggleEdit = function(seedIndex) {
	    $scope.vm.seedArray[seedIndex].isEditing = !$scope.vm.seedArray[seedIndex].isEditing;
	};

	$scope.vm.submit = function(seedIndex) {
	    $scope.vm.toggleEdit(seedIndex);
	    DataService.UpdateSeed($scope.vm.seedArray[seedIndex]);
	};
    }]);
})();
