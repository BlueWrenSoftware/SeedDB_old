(function() {
    angular.module('seed-db').controller('seedlistCtrl', ['$scope', 'seedlist', 'seedtypes',  'Seed', function ($scope, seedlist, seedtypes, Seed) {

	$scope.vm = {
	    seedArray: seedlist,
	    seedTypes: seedtypes	    
	};

	var createNewSeed = function () {
	    $scope.vm.newSeed = new Seed({
		seedId: null,
		seedType: $scope.vm.seedTypes[0],
		seedVarietyName: "",
		seedVarietyNote: ""
	    }, false)
	};

	createNewSeed();

	$scope.view = {
	    editSeedType: new Array(_.size($scope.vm.seedArray)),
	    editSeedVarietyName: new Array(_.size($scope.vm.seedArray)),
	    createSeedVarietyName: false
	};

	$scope.controls = {
	    addNewSeed: function() {
		$scope.vm.newSeed.create().then(function (seedId) {
		    $scope.vm.newSeed._seedId = seedId;
		    $scope.vm.newSeed._isAutoSave = true;
		    $scope.vm.seedArray.push($scope.vm.newSeed);
		    createNewSeed();
		});
	    }
	};
	
    }]);
})();
