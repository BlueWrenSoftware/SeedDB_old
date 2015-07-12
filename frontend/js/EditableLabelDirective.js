(function () {
    angular.module('seed-db').directive('bwEditLabel', ['$timeout', function ($timeout) {
	return {
	    templateUrl: "js/bwEditLabel.html",
	    restrict: 'E',
	    transclude: true,
	    scope: {
		bwIsEditing: '=',
		bwModel: '=',
		bwType: '='
	    },
	    link: function(scope, element, attrs) {
		// TODO: Fix the auto-focus.
		scope.$watch(scope.bwIsEditing, function(value) {
		    console.log(value);
		    if(value) { 
			
			$timeout(function() {
			    element[0].childNodes[2].childNodes[1].focus();
			    scope[scope.bwIsEditing] = false;
			});
		    }
		});
		
	    }
	};
    }]);
})();
