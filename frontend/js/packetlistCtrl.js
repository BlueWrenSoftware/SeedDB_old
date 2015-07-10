(function() {
    angular.module('seed-db').controller('packetlistCtrl', ['$scope', 'packets', 'companies', function ($scope, packets, companies) {
	$scope.vm = {
	    packets: packets,
	    companies: companies
	};

	$scope.view = {
	    editPacketCode: _.fill(new Array($scope.vm.packets.length), false),
	    editCompany: _.fill(new Array($scope.vm.packets.length), false),
	    editDatePurchased: _.fill(new Array($scope.vm.packets.length), false),
	    editDateUseBy: _.fill(new Array($scope.vm.packets.length), false),
	    editSeedCount: _.fill(new Array($scope.vm.packets.length), false),
	    editStorageLocation: _.fill(new Array($scope.vm.packets.length), false)
	};
    }]);
})();
