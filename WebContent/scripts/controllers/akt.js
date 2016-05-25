'use strict';

angular.module('akt', [
	'resource.akt',
	'ui.bootstrap'])

.controller('aktCtrl', function (Akt,$rootScope, $scope, $routeParams, $log, $location, $q, $http) {
	
	if($routeParams.aktId!='new'){
		var aktId = $routeParams.aktId;
		
		
		Akt.get({'aktId':aktId}).$promise.then(function (data) {
			$scope.akt = data;
			
		});
	}
	
	else{
		$scope.akt = new Akt();
		
	}
	//funkcija koja otvara datepicker
	$scope.openDatepicker = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};
	
	$scope.items = [];
	
	$scope.Definicija = function(){
		
		 $scope.items.push({ 
//	            inlineChecked: false,
//	            question: "",
//	            questionPlaceholder: "foo",
//	            text: ""
	          });
	        };

	
	$scope.save = function () {
		
		
		
		if($scope.akt.id){
			$log.info($scope.akt);
			
			$scope.akt.$update({aktId:$scope.akt.id},function () {
				$location.path('/akt-list');
			});
		}
		else{
			$scope.akt.$save(function () {
				$location.path('/akt-list');
			});
		}
		$log.info("save");
	}

	$scope.delete = function () {
		if($scope.akt.id){
			$scope.akt.$delete({aktId:$scope.akt.id}, function () {
				$location.path('/akt-list');
			});
		}
	}
	

	

	/*$scope.$watch( 'current',
		function(newValue, oldValue){
			console.log('firstName Changed');
			console.log(newValue);
			console.log(oldValue);
			$scope.triggerChangeWithApply();
		}
	);*/

	/*$scope.triggerChangeWithApply = function () {
		
		console.log('First name being reset');
		$scope.$apply(function(){
			$scope.current = 'lll';
			}
		);
		
	};*/

	



});
