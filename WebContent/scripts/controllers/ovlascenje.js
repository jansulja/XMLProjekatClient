'use strict';

angular.module('ovlascenje', [])

.controller('ovlascenjeCtrl', function ($scope, $modalInstance, ovlascenje) {
	if(ovlascenje){
		$scope.ovlascenje = ovlascenje;
	}
	else{
		$scope.ovlascenje = {};	
	}
	$scope.ok = function () {
		$modalInstance.close({'ovlascenje':$scope.ovlascenje,
								'action':'save'});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.delete = function () {
		$modalInstance.close({'ovlascenje':$scope.ovlascenje,
								'action':'delete'});
	};
});
