(function () {
    angular.module('seed-db').factory('ViewModel', [function() {
	return function(value) {
	    this.value = value;
	    this.isEditing = false;
	};
    }])
})();
