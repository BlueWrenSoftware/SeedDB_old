(function() {
    angular
	.module('seed-db')
	.config(['$stateProvider',
        	 function($stateProvider) {
          	     $stateProvider
            		 .state('seedlist', {
	      		     url: '',
              		     templateUrl: 'templates/seedlist.html',
			     controller: 'seedlistCtrl as seedlistCtrl',
			     resolve: {
				 seedlist: function($http) {
				     return $http.get('api/seedlist');
				 },
				 seedtypes: function($http) {
				     return $http.get('api/seedtypes');
				 }
			     }
			     
			 })
			 .state('packetlist', {
			     url: 'packetlist/:seedId',
			     templateUrl: 'templates/packetlist.html',
			     controller: 'packetlistCtrl as controller'
			 });
		 }
		])
})()
