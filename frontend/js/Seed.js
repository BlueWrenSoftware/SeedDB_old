(function() {
    angular.module('seed-db').factory('Seed', ['ViewModel', 'SeedType', function(ViewModel, SeedType) {
	var Seed = function(data) {
	    this.seedId = new ViewModel(data.seedId);
	    this.seedVarietyName = new ViewModel(data.seedVarietyName);
	    this.seedTypeId = new ViewModel(data.seedTypeId);
	    this.seedVarietyNote = new ViewModel(data.seedVarietyNote);
	    this.seedType = new SeedType({
		seedTypeId: data.seedTypeId,
		seedTypeName: data.seedTypeName,
		seedDescription: data.seedDescription
	    });
	};

	Seed.prototype.toRaw = function() {
	    return {
		seedId: this.seedType.seedTypeId,
		seedVarietyName: this.seedVarietyName,
		seedTypeId: this.seedTypeId,
		seedVarietyNote: this.seedVarietyNote
	    }
	}

	return Seed;
    }]);
})();
