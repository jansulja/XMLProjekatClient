'use strict';

angular.module('akti', ['resource.akt','angular-md5'])


 .controller('aktListCtrl', function (Akt, $scope, $location, md5, $log) {
 	
	$scope.akti = Akt.query();
	console.log($scope.akti);
	//kada smo kliknuli na red u tabeli prelazimo na stranicu za editovanje fakture sa zadatim id-om
 	
	$scope.insertOrEditAkt = function (akt) {
 		if(akt){
 			$location.path('/akt/'+akt.id);
 		}
 		else{
			$location.path('/akt/new');
 		}
 	}
	
 });