'use strict';

angular.module('amandman-new',[])

.controller('amandman-newCtrl', function($scope,$q,$http,$location,$rootScope){

		

		$scope.authenticate = function(){

			if($rootScope.current.ime == ""){
				$location.path('login');
				return false;
			}else{

				return true;
			}
		}

		$scope.predloziAmandman = function(){

			$scope.xmlString = $($scope.root).xmlEditor("xml2Str");

			var deferred = $q.defer();
			
			$http({
				url: "https://localhost:8443/xws/api/amandman/new", 
				method: "POST",
				data: $scope.xmlString,
				headers: { "Content-Type": 'application/xml' }
			}).success(function (data) {
				deferred.resolve(data);
			});

			var promise = deferred.promise;
			promise.then(function (data) {
				console.log('success');
			});



		}
})

.directive("rootElementAmandman", ['$location', function() {
    return {
        link: function(scope, elem, attrs) {
        		
        	if(scope.authenticate()){

        		var extractor = new Xsd2Json("amandman.xsd", {"schemaURI":"schema/", "rootElement": "amandman"});
            	
				$(elem).xmlEditor({
					schema : extractor.getSchema(),

				});

				scope.root = elem;
				
				
			}
                
           		

           
        }
    };
}]);

