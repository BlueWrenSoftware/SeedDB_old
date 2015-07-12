(function () {
    angular.module('seed-db').directive('bwSelectLabel', function () {
	return {
	    templateUrl: "directives/BwSelectLabel.html",
	    restrict: 'E',
	    transclude: true,
	    scope: {
		bwIsEditing: '=',
		bwModel: '=',
		bwOptions: '='
	    }
	};
    });
})();
