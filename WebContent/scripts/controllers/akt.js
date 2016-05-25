'use strict';

angular.module('akt', [
	'resource.akt',
	'ui.bootstrap'])

.controller('aktCtrl', function (Akt,$rootScope, $scope, $routeParams, $log, $location, $q, $http) {
	
	//---------------Osnovno nesto---------------------------------------------------------
	if($routeParams.aktId!='new'){
		var aktId = $routeParams.aktId;
		
		
		Akt.get({'aktId':aktId}).$promise.then(function (data) {
			$scope.akt = data;
			
		});
	}
	
	else{
		$scope.akt = new Akt();
		
	}

	//-------------------------------------------------------------------------------------------------


	//--------Datepicker funkcija----------------------------------------------------------------------
	$scope.openDatepicker = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};
	//-------------------------------------------------------------------------------------------------
	

//----------------Dodavanje i brisanje definicija--------------------------------------------------
  //promenljiva sa svim definicijama
  $scope.listaDefinicija = [{id: 'choice1'}];
  
  $scope.dodajDefiniciju = function($event) {
  	$event.preventDefault();
	$event.stopPropagation();
    var newItemNo = $scope.listaDefinicija.length+1;
    $scope.listaDefinicija.push({'id':'choice'+newItemNo});
  };
    
  $scope.ukloniDefiniciju = function($event) {
  	$event.preventDefault();
	$event.stopPropagation();
    var lastItem = $scope.listaDefinicija.length-1;
    $scope.listaDefinicija.splice(lastItem);
  };
//-------------------------------------------------------------------------------------------------

//----------------Dodavanje i brisanje ovlascenja--------------------------------------------------
$scope.listaOvlascenja = [{id: 'ovlascenje1'}];

$scope.dodajOvlascenje = function($event){
	$event.preventDefault();
	$event.stopPropagation();
	var newItemNo = $scope.listaOvlascenja.length+1;
	$scope.listaOvlascenja.push({'id':'choice'+newItemNo})
};

$scope.ukloniOvlascenje = function($event){
	$event.preventDefault();
	$event.stopPropagation();
	var lastItem = $scope.listaOvlascenja.length-1;
	$scope.listaOvlascenja.splice(lastItem);
};

//-------------------------------------------------------------------------------------------------
	
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
