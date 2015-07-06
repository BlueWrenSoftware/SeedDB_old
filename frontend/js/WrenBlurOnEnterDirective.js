(function () {
    angular.module('seed-db').directive('wrenBlurOnEnter', function() {
	return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
		if(event.which === 13) {
                    element[0].blur();
		}

            });
	};
    });
})();
