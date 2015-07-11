(function() {
    angular.module('seed-db').controller('packetlistCtrl', ['$scope', 'packets', 'companies', 'seedId', 'Packet', 'Constants', function ($scope, packets, companies, seedId, Packet, Constants) {
	var newPacketData = {
	    packetId: null,
	    packetCode: null,
	    seedId: seedId,
	    company: companies[0],
	    datePurchased: new Date() / Constants.MILLISECONDS_IN_DAY,
	    dateUseBy: new Date() / Constants.MILLISECONDS_IN_DAY,
	    seedCount: 0,
	    packetTreatment: null,
	    storageLocation: null
	};

	$scope.vm = {
	    packets: packets,
	    companies: companies,
	    newPacket: new Packet(newPacketData)
	};

	$scope.view = {
	    editPacketCode: _.fill(new Array($scope.vm.packets.length), false),
	    editCompany: _.fill(new Array($scope.vm.packets.length), false),
	    editDatePurchased: _.fill(new Array($scope.vm.packets.length), false),
	    editDateUseBy: _.fill(new Array($scope.vm.packets.length), false),
	    editSeedCount: _.fill(new Array($scope.vm.packets.length), false),
	    editStorageLocation: _.fill(new Array($scope.vm.packets.length), false)
	};

	$scope.controls = {
	    addNewPacket: function() {
		$scope.vm.newPacket.create().then(function (packetId) {
		    $scope.vm.newPacket._packetId = packetId;
		    $scope.vm.packets.push($scope.vm.newPacket);
		    $scope.vm.newPacket = new Packet(newPacketData);
		});
	    }
	};
						 
    }]);
})();
