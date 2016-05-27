'use strict';

angular.module('definicija', [])

.controller('definicijaCtrl', function ($scope, $modalInstance, definicija) {
	if(definicija){
		$scope.definicija = definicija;
	}
	else{
		$scope.definicija = {};	
	}
	$scope.ok = function () {
		$modalInstance.close({'definicija':$scope.definicija,
								'action':'save'});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.delete = function () {
		$modalInstance.close({'definicija':$scope.definicija,
								'action':'delete'});
	};
});
