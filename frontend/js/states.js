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
				 seedlist: function(DataService) {
				     return DataService.getSeeds();
				 },
				 seedtypes: function(DataService) {
				     return DataService.getSeedTypes();
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
