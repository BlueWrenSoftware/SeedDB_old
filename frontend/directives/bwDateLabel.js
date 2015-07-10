(function () {
    angular.module('seed-db').directive('bwDateLabel', function () {
	return {
	    templateUrl: "directives/bwDateLabel.html",
	    restrict: 'E',
	    transclude: true,
	    scope: {
		bwIsEditing: '=',
		bwModel: '='		
	    },
	    link: function(scope, element, attrs) {
		scope.opened = false;
		scope.open = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();

		    scope.opened = true;
		};
		scope.dateOptions = {
		    formatYear: 'yy',
		    startingDay: 1
		};
	    }
	};
    });
})();
