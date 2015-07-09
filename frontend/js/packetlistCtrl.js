(function() {
    angular.module('seed-db').controller('packetlistCtrl', ['$scope', 'packets', 'companies', function ($scope, packets, companies) {
	$scope.vm = {
	    packets: packets,
	    companies: companies
	};

	$scope.view = {
	    editPacketCode: new Array($scope.vm.packets.length),
	    editCompany: new Array($scope.vm.packets.length),
	    editDatePurchased: new Array($scope.vm.packets.length),
	    editDateUseBy: new Array($scope.vm.packets.length),
	    editSeedCount: new Array($scope.vm.packets.length),
	    editStorageLocation: new Array($scope.vm.packets.length)
	};
    }]);
})();
