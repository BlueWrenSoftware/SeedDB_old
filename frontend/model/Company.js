(function() {
    angular.module('seed-db').factory('Company', function() {
	var Company = function(data) {
	    this._companyId = data.companyId;
	    this._companyName = data.companyName;
	    this._companyAddress = data.companyAddress;
	    this._companyUrl = data.companyUrl;
	};
	
	Object.defineProperty(Company.prototype, 'companyId', { get: function () {return this._companyId;} });
	Object.defineProperty(Company.prototype, 'companyName', { get: function () {return this._companyName;} });
	Object.defineProperty(Company.prototype, 'companyAddress', { get: function () {return this._companyAddress;} });
	Object.defineProperty(Company.prototype, 'companyUrl', { get: function () {return this._companyUrl;} });
	
	return Company;
	
    });
})();

