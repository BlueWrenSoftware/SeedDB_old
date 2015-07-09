(function () {
    angular.module('seed-db').directive('bwEditLabel', function () {
	return {
	    require: ['ngClick', 'ngHide', 'ngShow', 'ngModel', 'ngBlur', 'wrenFocusOn'],
	    templateUrl: "js/bwEditLabel.html",
	    restrict: 'E',
	    scope: {
		bwIsEditing: '&',
		bwModel: '&'
	    }
	};
    });
})();
