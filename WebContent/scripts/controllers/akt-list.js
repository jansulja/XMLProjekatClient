'use strict';

angular.module('akt-list',[])

.controller('akt-listCtrl', function ($scope, $q, $http){
		var deferred = $q.defer();
		$scope.akts = [];

		$http({
		  method: 'GET',
		  url: 'https://localhost:8443/xws/api/akt/list'
		}).success(function (data) {
		    // this callback will be called asynchronously
		    // when the response is available
		    //$scope.akts.push(response.data);
			deferred.resolve(data);

		//  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.

		  });
		var promise = deferred.promise;
		promise.then(function (data) {
			
			$scope.akts = data;
			
		});


$scope.obrisiAkt = function (akt){
}
	


});