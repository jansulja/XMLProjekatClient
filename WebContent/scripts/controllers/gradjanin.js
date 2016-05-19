'use strict';

angular.module('gradjanin', [
	'resource.gradjani',
	'ui.bootstrap'])

.controller('gradjaninCtrl', function (Gradjanin, $scope, $routeParams, $log, $location, $q, $http) {
	
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

	
	$scope.save = function () {
		
		
		
		if($scope.gradjanin.id){
			$log.info($scope.gradjanin);
			
			$scope.gradjanin.$update({gradjaninId:$scope.gradjanin.id},function () {
				$location.path('/gradjanin-list');
			});
		}
		else{
			$scope.gradjanin.$save(function () {
				$location.path('/gradjanin-list');
			});
		}
		$log.info("save");
	}

	$scope.delete = function () {
		if($scope.gradjanin.id){
			$scope.gradjanin.$delete({gradjaninId:$scope.gradjanin.id}, function () {
				$location.path('/gradjanin-list');
			});
		}
	}
	
	
	$scope.login = function () {

		var deferred = $q.defer();
			//user.password = md5.createHash(user.password);
		$http({
			url: "http://localhost:8089/xws/api/gradjanin/login", 
			method: "POST",
			data: $scope.gradjanin
		}).success(function (data) {
			deferred.resolve(data);
		});

		var promise = deferred.promise;
		$scope.gradjanin = {};
		promise.then(function (data) {
			$log.info(data);
			$location.path('gradjanin-list');
		});
	}

});
