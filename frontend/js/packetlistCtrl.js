(function() {
    angular.module('seed-db').controller('packetlistCtrl', ['$scope', 'packets', 'companies', function ($scope, packets, companies) {
	$scope.vm = {
	    packets: packets,
	    companies: companies
	};

	$scope.view = {
	    editPacketCode: new Array($scope.vm.packets.length),
	    editSource: new Array($scope.vm.packets.length),
	    editDateAcquired: new Array($scope.vm.packets.length),
	    editUseBy: new Array($scope.vm.packets.length),
	    editNumberOfSeeds: new Array($scope.vm.packets.length),
	    editLocation: new Array($scope.vm.packets.length)
    });
})();
