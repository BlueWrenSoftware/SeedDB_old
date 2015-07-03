(function() {
	angular
		.module('seed-db')
		.config(['$stateProvider',
        		function($stateProvider) {
          			$stateProvider
            				.state('seedlist', {
	      					url: '',
              					templateUrl: 'templates/seedlist.html',
						controller: 'seedlistCtrl as seedlistCtrl'	
            });
	}
      ])
})()
