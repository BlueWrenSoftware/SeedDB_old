(function() {
    angular.module('seed-db').factory('Company', ['PostDataService', function(PostDataService) {
	var Company = function(data) {
	    this._companyId = data.companyId;
	    this._companyName = data.companyName;
	    this._companyAddress = data.companyAddress;
	    this._companyUrl = data.companyUrl;
	};
	
	Object.defineProperty(Company.prototype, 'companyId', { get: function () {return this._companyId;} });
	Object.defineProperty(Company.prototype, 'companyName', {
	    get: function () {return this._companyName;},
	    set: function (value) {this._companyName = value;}
	});
	Object.defineProperty(Company.prototype, 'companyAddress', { get: function () {return this._companyAddress;} });
	Object.defineProperty(Company.prototype, 'companyUrl', { get: function () {return this._companyUrl;} });

	Company.prototype.toRaw = function () {
	    return {
		companyId: this._companyId,
		companyName: this._companyName,
		companyAddress: this._companyAddress,
		companyUrl: this._companyUrl
	    };
	};

	Company.prototype.create = function() {
	    if (this.companyId !== null) {
		throw "Attempted to create an existing company."
	    }
	    return PostDataService.createOrUpdateCompany(this.toRaw());
	};
	
	return Company;
	
    }]);
})();

