(function () {
    angular.module('seed-db').factory('constants', function () {
	var constants = {
	    MILLISECONDS_IN_DAY: 24 * 60 * 60 * 1000
	};
	return constants;
    });
})();
