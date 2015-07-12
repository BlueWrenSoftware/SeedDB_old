(function() {
    angular.module('seed-db').controller('NewCompanyModalController', ['$scope', '$modalInstance', 'Company', function ($scope, $modalInstance, Company) {
	$scope.model = {
	    company: new Company({
		companyId: null,
		companyName: null,
		companyAddress: null,
		companyUrl: null
	    })
	};

	$scope.controls = {
	    add: function () {
		$modalInstance.close($scope.model.company);
	    },
	    cancel: function () {
		$modalInstance.dismiss();
	    }
	};
    }]);
})();
