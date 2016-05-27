'use strict';

angular.module('akt', [
	'resource.akt',
	'definicija',
	'resource.definicija',
	'ovlascenje',
	'resource.ovlascenje',
	'ui.bootstrap'])

.controller('aktCtrl', function (Akt,$rootScope, $scope, $routeParams, $log, $location, $q, $http, $modal) {
	
	//---------------Osnovno nesto---------------------------------------------------------
	if($routeParams.aktId!='new'){
		var aktId = $routeParams.aktId;
		
		
		Akt.get({'aktId':aktId}).$promise.then(function (data) {
			$scope.akt = data;
			
		});
	}
	
	else{
		$scope.akt = new Akt();
		$scope.akt.definicije = [];
		$scope.akt.ovlascenja = [];
		
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

$scope.openModal = function (definicija, size) {

	var modalInstance = $modal.open({
		templateUrl: 'views/definicija.html',
		controller: 'definicijaCtrl',
		size: size,
		resolve: {
			definicija: function(){
				return definicija;
			}
		}
	});
	modalInstance.result.then(function (data){
		var definicija = data.definicija;
		//ako stavka fakture nema id i ako je akcija 'save' znaci da je nova i dodaje se u listu. ako ima, svakako se manja u listi
		if(!definicija.id && data.action === 'save'){
			$scope.akt.definicije.push(definicija);
		}
		//ako stavka treba da se obrise izbaci se iz niza
		if(data.action === 'delete'){
			var index = $scope.akt.definicije.indexOf(
				definicija);
			$scope.akt.definicije.splice(index, 1);

		}
	}, function () {
		$log.info('Modal dismissed at: ' + new Date());
	});
};

//-------------------------------------------------------------------------------------------------
//Dodavanje ovlascenja
$scope.openModalOvlascenje = function (ovlascenje, size) {

	var modalInstance = $modal.open({
		templateUrl: 'views/ovlascenje.html',
		controller: 'ovlascenjeCtrl',
		size: size,
		resolve: {
			ovlascenje: function(){
				return ovlascenje;
			}
		}
	});
	modalInstance.result.then(function (data){
		var ovlascenje = data.ovlascenje;
		//ako stavka fakture nema id i ako je akcija 'save' znaci da je nova i dodaje se u listu. ako ima, svakako se manja u listi
		if(!ovlascenje.id && data.action === 'save'){
			$scope.akt.ovlascenja.push(ovlascenje);
		}
		//ako stavka treba da se obrise izbaci se iz niza
		if(data.action === 'delete'){
			var index = $scope.akt.ovlascenja.indexOf(
				ovlascenje);
			$scope.akt.ovlascenja.splice(index, 1);

		}
	}, function () {
		$log.info('Modal dismissed at: ' + new Date());
	});
};





















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


//----------------Dodavanje i brisanje kaznenih radnji i sankcija----------------------------------
$scope.listaradnjiISankcija = [{id: 'radnjaISankcija'}];

$scope.dodajRadnjaISankcija = function($event){
	$event.preventDefault();
	$event.stopPropagation();
	var newItemNo = $scope.listaradnjiISankcija.length+1;
	$scope.listaradnjiISankcija.push({'id':'choice'+newItemNo})
};


$scope.ukloniRadnjaISankcija = function($event){
	$event.preventDefault();
	$event.stopPropagation();
	var lastItem = $scope.listaradnjiISankcija.length-1;
	$scope.listaradnjiISankcija.splice(lastItem);
};

//-------------------------------------------------------------------------------------------------


//----------------Dodavanje normi-------------------------------------------------------------------
$scope.listaNormi = [{id: 'norma'}];

$scope.dodajNormu = function($event){
	$event.preventDefault();
	$event.stopPropagation();
	var newItemNo = $scope.listaNormi.length+1;
	$scope.listaNormi.push({'id':'choice'+newItemNo})
};

$scope.ukloniNormu = function($event){
	$event.preventDefault();
	$event.stopPropagation();
	var lastItem = $scope.listaNormi.length-1;
	$scope.listaNormi.splice(lastItem);
};

//-------------------------------------------------------------------------------------------------
//----------------Dodavanje kaznenih odredbi-------------------------------------------------------
$scope.listaKaznenihOdredba = [{id: 'odredba'}];

$scope.dodajKaznenuOdredbu = function($event){
	$event.preventDefault();
	$event.stopPropagation();
	var newItemNo = $scope.listaKaznenihOdredba.length+1;
	$scope.listaKaznenihOdredba.push({'id':'choice'+newItemNo})
};

$scope.ukloniKaznenuOdredbu = function($event){
	$event.preventDefault();
	$event.stopPropagation();
	var lastItem = $scope.listaKaznenihOdredba.length-1;
	$scope.listaKaznenihOdredba.splice(lastItem);
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
