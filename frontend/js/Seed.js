(function() {
    angular.module('seed-db').factory('Seed', ['SeedType', 'PostDataService', function(SeedType, PostDataService) {
	var Seed = function(data, isAutoSave) {
	    
	    // attributes
	    this._seedId = data.seedId;
	    this._seedVarietyName = data.seedVarietyName;
	    this._seedVarietyNote = data.seedVarietyNote;
	    if (data.seedType) {
		this._seedType = data.seedType;
	    }
	    else {
		this._seedType = new SeedType({
		    seedTypeId: data.seedTypeId,
		    seedTypeName: data.seedTypeName,
		    seedDescription: data.seedDescription
		});
	    }

	    this._isEditing = false;
	    this._isAutoSave = isAutoSave === undefined ? true : isAutoSave;
	};

	
	// properties
	Object.defineProperty(Seed.prototype, 
			      'seedId', {
				  get: function() { return this._seedId; }
			      });
	Object.defineProperty(Seed.prototype,
			      'seedVarietyName', {
				  get: function () { return this._seedVarietyName; },
				  set: function (value) {
				      this._seedVarietyName = value;
				      if (this._isAutoSave) {
					  this.save();
				      };
				  }
			      });
	Object.defineProperty(Seed.prototype, 
			      'seedVarietyNote', {
				  get: function () { return this._seedVarietyNote; },
				  set: function (value) {
				      this._seedVarietyNote = value;
				      if (this._isAutoSave) {
					  this.save();
				      }
				  }
			      });
	Object.defineProperty(Seed.prototype, 
			      'seedType', {
				  get: function () { return this._seedType; },
				  set: function (value) {
				      this._seedType = value;
				      if (this._isAutoSave) {
					  this.save();
				      }
				  }
			      });
	Object.defineProperty(Seed.prototype,
			      'isEditing', {
				  get: function () {return this._isEditing}
				  
			      });
	
	
	// methods

	Seed.prototype.toRaw = function() {
	    return {
		seedId: this.seedId,
		seedVarietyName: this.seedVarietyName,
		seedTypeId: this.seedType._seedTypeId,
		seedVarietyNote: this.seedVarietyNote
	    }
	}

	Seed.prototype.save = function() {
	    if (this.seedId === null) {
		throw "Attempted to save non-existent seed."
	    }
	    PostDataService.createOrUpdateSeed(this.toRaw());
	}

	Seed.prototype.create = function() {
	    if (this.seedId !== null) {
		throw "Attempted to create an existing seed."
	    }
	    
	    return PostDataService.createOrUpdateSeed(this.toRaw())
		.then(function(data) {
		    return data.seedId;
		});
	}

	Seed.prototype.edit = function () {
	    this._isEditing = true;
	}

	Seed.prototype.done = function () {
	    this._isEditing = false;
	}

	return Seed;

	

    }]);
})();
