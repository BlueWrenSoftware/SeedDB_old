(function() {
    angular.module('seed-db').config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('seedlist', {
	      	url: '',
              	templateUrl: 'templates/seedlist.html',
		controller: 'seedlistCtrl as seedlistCtrl',
		resolve: {
		    seedlist: function(GetDataService) {
			return GetDataService.getSeeds();
		    },
		    seedtypes: function(GetDataService) {
			return GetDataService.getSeedTypes();
		    }
		}
		
	    })
	    .state('packetlist', {
		url: '/packetlist/{seedId}',
		templateUrl: 'templates/packetlist.html',
		controller: 'packetlistCtrl as controller',
		resolve: {
		    packets: function (GetDataService, $stateParams) {
			return GetDataService.getPackets($stateParams.seedId);
		    },
		    companies: function (GetDataService) {
			return GetDataService.getCompanies();
		    },
		    seed: function (GetDataService, $stateParams) {
			return GetDataService.getSeed($stateParams.seedId);
		    },
		    seedTypes: function (GetDataService) {
			return GetDataService.getSeedTypes();
		    }
		}
	    });
    }]);
})()
