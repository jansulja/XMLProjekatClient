'use strict';

angular.module('gradjanin', [
	'resource.gradjani',
	'ui.bootstrap'])

.controller('gradjaninCtrl', function (Gradjanin, $scope, $routeParams, $log, $location) {
	
	if($routeParams.gradjaninId!='new'){
		var gradjaninId = $routeParams.gradjaninId;
		
		
		Gradjanin.get({'gradjaninId':gradjaninId}).$promise.then(function (data) {
			$scope.gradjanin = data;
	
		});
	}
	
	else{
		$scope.gradjanin = new Gradjanin();
		
	}
	//funkcija koja otvara datepicker
	$scope.openDatepicker = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};

	//modalni dijalog za stavku fakutre
	

	//cuvanje izmena
	$scope.save = function () {
		if($scope.gradjanin.id){
			//zbog cega redirekcija ide na callback?
//			$scope.invoice.$update({invoiceId:$scope.invoice.id},function () {
//				$location.path('/invoiceList');
//			});
		}
		else{
			$scope.gradjanin.$save(function () {
				$location.path('/gradjanin-list');
			});
		}
		$log.info("save");
	}
//
//	$scope.delete = function () {
//		if($scope.invoice.id){
//			$scope.invoice.$delete({invoiceId:$scope.invoice.id}, function () {
//				$location.path('invoiceList');
//			});
//		}
//	}

});
