(function() {
    angular.module('seed-db').factory('Packet', ['Company', 'PostDataService', function(Company, PostDataService) {
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
	    this._datePurchased = data.datePurchased;
	    this._dateUseBy = data.dateUseBy;
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
				  get: function () { return this._datePurchased; },
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
				  get: function () { return this._dateUseBy; },
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
		packetId: this.packetId,
		seedId: this.seedId,
		companyId: this.company.companyId,
		datePurchased: this.datePurchased,
		dateUseBy: this.dateUseBy,
		seedCount: this.seedCount,
		packageTreatment: this.packageTreatment,
		storageLocation: this.storageLocation
	    }
	}

	Packet.prototype.save = function () {
	    if (this.packet.packetId !== null) {
		throw "Attempted to save a non-existent packet."
	    }
	    PostDataService.createOrUpdatePacket(this.toRaw());
	}

	Packet.prototype.create = function () {
	    if (this.packet.packedId === null) {
		throw "Attempted to create an existing packet."
	    }
	    PostDataService.createOrUpdatePacket(this.toRaw());
	}

	return Packet;
    }]);
})();
