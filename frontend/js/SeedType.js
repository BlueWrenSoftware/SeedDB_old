(function() {
    angular.module('seed-db').factory('SeedType', [function(EditableValue) {
	var SeedType = function(data) {
	    
	    this._seedTypeId = data.seedTypeId;
	    this._seedTypeName = data.seedTypeName;
	    this._seedDescription = data.seedDescription;
	};
	
	Object.defineProperty(SeedType.prototype, 'seedTypeId', { get: function () {return this._seedTypeId;} });
	Object.defineProperty(SeedType.prototype, 'seedTypeName', { get: function () {return this._seedTypeName;} });
	Object.defineProperty(SeedType.prototype, 'seedDescription', { get: function () {return this._seedDescription;} });
	
	return SeedType;
	
    }]);
})();
