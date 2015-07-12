(function () {
    angular.module('seed-db').directive('wrenFocusOn', ['$timeout', function($timeout) {
	return {
	    link: function(scope, element, attrs) {
		scope.$watch(attrs.wrenFocusOn, function(value) {
		    if(value === true) { 
			$timeout(function() {
			    element[0].focus();
			    scope[attrs.wrenFocusOn] = false;
			});
		    }
		});
	    }
	};
    }]);
})();
