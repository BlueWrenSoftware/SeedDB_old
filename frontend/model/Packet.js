(function() {
    angular.module('seed-db').factory('Packet', ['Company', 'PostDataService', 'Constants',  function(Company, PostDataService, Constants) {
	var Packet = function(data, isAutoSave) {
	    // attributes
	    this._packetId = data.packetId;
	    this._packetCode = data.packetCode;
	    this._seedId = data.seedId;
	    if (data.company) {
		this._company = data.company;
	    }
	    else {
		this._company = new Company({
		    companyId: data.companyId,
		    companyName: data.companyName,
		    companyAddress: data.companyAddress,
		    companyUrl: data.companyUrl
		});
	    }
	    this._datePurchased = new Date(data.datePurchased * Constants.MILLISECONDS_IN_DAY);
	    this._dateUseBy = new Date(data.dateUseBy * Constants.MILLISECONDS_IN_DAY);
	    this._seedCount = data.seedCount;
	    this._packetTreatment = data.packetTreatment;
	    this._storageLocation = data.storageLocation;
	    
	    this._isAutoSave = isAutoSave === undefined ? true : isAutoSave;
	};

	// properties
	Object.defineProperty(Packet.prototype,
			      'packetId', {
				  get: function() { return this._packetId; }
			      });

	Object.defineProperty(Packet.prototype,
			      'packetCode',
			      {
				  get: function () { return this._packetCode; },
				  set: function (value) {
				      this._packetCode = value;
				      if (this._isAutoSave) {
					  this.save();
				      };
				  }
			      });

	Object.defineProperty(Packet.prototype,
			      'company',
			      {
				  get: function () { return this._company; },
				  set: function (value) {
				      this._company = value;
				      if (this._isAutoSave) {
					  this.save();
				      };
				  }
			      });

	
	Object.defineProperty(Packet.prototype,
			      'datePurchased',
			      {
				  get: function () { return this._datePurchased.toDateString(); },
				  set: function (value) {
				      this._datePurchased = value;
				      if (this._isAutoSave) {
					  this.save();
				      };
				  }
			      });

	
	Object.defineProperty(Packet.prototype,
			      'dateUseBy',
			      {
				  get: function () { return this._dateUseBy.toDateString(); },
				  set: function (value) {
				      this._dateUseBy = value;
				      if (this._isAutoSave) {
					  this.save();
				      };
				  }
			      });

 	Object.defineProperty(Packet.prototype,
			      'seedCount',
			      {
				  get: function () { return this._seedCount; },
				  set: function (value) {
				      this._seedCount = value;
				      if (this._isAutoSave) {
					  this.save();
				      };
				  }
			      });

 	Object.defineProperty(Packet.prototype,
			      'packetTreatment',
			      {
				  get: function () { return this._packetTreatment; },
				  set: function (value) {
				      this._packetTreatment = value;
				      if (this._isAutoSave) {
					  this.save();
				      };
				  }
			      });

 	Object.defineProperty(Packet.prototype,
			      'storageLocation',
			      {
				  get: function () { return this._storageLocation; },
				  set: function (value) {
				      this._storageLocation = value;
				      if (this._isAutoSave) {
					  this.save();
				      };
				  }
			      });
	
	// methods

	Packet.prototype.toRaw = function () {
	    return {
		packetId: this._packetId,
		seedId: this._seedId,
		companyId: this._company._companyId,
		datePurchased: this._datePurchased.valueOf() / Constants.MILLISECONDS_IN_DAY,
		dateUseBy: this._dateUseBy.valueOf() / Constants.MILLISECONDS_IN_DAY,
		seedCount: this._seedCount,
		packageTreatment: this._packageTreatment,
		storageLocation: this._storageLocation
	    }
	}

	Packet.prototype.save = function () {
	    if (this.packetId === null) {
		throw "Attempted to save a non-existent packet."
	    }
	    PostDataService.createOrUpdatePacket(this.toRaw());
	}

	Packet.prototype.create = function () {
	    if (this.packedId !== null) {
		throw "Attempted to create an existing packet."
	    }
	    PostDataService.createOrUpdatePacket(this.toRaw());
	}

	return Packet;
    }]);
})();
