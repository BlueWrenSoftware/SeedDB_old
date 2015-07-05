(function() {
    angular.module('seed-db').factory('SeedType', ['ViewModel', function(ViewModel) {
	var SeedType = function(data) {
	    this.seedTypeId = new ViewModel(data.seedTypeId);
	    this.seedTypeName = new ViewModel(data.seedTypeName);
	    this.seedDescription = new ViewModel(data.seedDescription);
	}

	return SeedType;
    }]);
})();
