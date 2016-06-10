'use strict';

angular.module('akt-list',[])

.controller('akt-listCtrl', function ($scope, $q, $http){

		$scope.akts = [];

		$http({
		  method: 'GET',
		  url: 'https://localhost:8443/xws/api/akt/list'
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.akts.push(response.data);

		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.

		  });
});