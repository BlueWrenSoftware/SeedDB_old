(function() {
    angular.module('seed-db').controller('packetlistCtrl', ['$scope', '$modal', 'packets', 'companies', 'seed', 'seedTypes', 'Packet', 'Constants', function ($scope, $modal, packets, companies, seed, seedTypes, Packet, Constants) {
	var newPacketData = {
	    packetId: null,
	    packetCode: null,
	    seedId: seed.seedId,
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
	    newPacket: new Packet(newPacketData),
	    seed: seed,
	    seedTypes: seedTypes
	};

	$scope.view = {
	    editPacketCode: _.fill(new Array($scope.vm.packets.length), false),
	    editCompany: _.fill(new Array($scope.vm.packets.length), false),
	    editDatePurchased: _.fill(new Array($scope.vm.packets.length), false),
	    editDateUseBy: _.fill(new Array($scope.vm.packets.length), false),
	    editSeedCount: _.fill(new Array($scope.vm.packets.length), false),
	    editStorageLocation: _.fill(new Array($scope.vm.packets.length), false),
	    newPacket: {
		editPacketCode: true,
		editCompany: true,
		editDatePurchased: true,
		editDateUseBy: true,
		editSeedCount: true,
		editStorageLocation: true
	    },
	    editSeed: {
		seedVarietyName: false,
		seedType: false,
		seedVarietyNote: false
	    }
	};

	$scope.controls = {
	    addNewPacket: function() {
		$scope.vm.newPacket.create().then(function (data) {
		    $scope.vm.newPacket._packetId = data.packetId;
		    $scope.vm.packets.push($scope.vm.newPacket);
		    $scope.vm.newPacket = new Packet(newPacketData);
		});
	    },
	    newCompanyModal: function() {
		var newCompanyModal = $modal.open({
		    templateUrl: 'modals/newCompanyModal.html',
		    controller: 'NewCompanyModalController',
		    resolve: {
			companies: function () {
			    return $scope.vm.companies;
			}
		    }
		});
		
		newCompanyModal.result.then(function (newCompany) {
		    newCompany.create().then(function (data) {
			newCompany._companyId = data.companyId;
		    });
		    $scope.vm.companies.push(newCompany);
		});
	    }
	};
						 
    }]);
})();
