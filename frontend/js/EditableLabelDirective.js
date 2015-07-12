(function () {
    angular.module('seed-db').directive('bwEditLabel', function () {
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
		scope.$watch(scope.bwIsEditing, function(value) {
		 
		    if(value === true) { 
			console.log('value=',value);
			$timeout(function() {
			    element[0].focus();
			    scope.bwIsEditing = false;
			});
		    }
		});
		
	    }
	};
    });
})();
