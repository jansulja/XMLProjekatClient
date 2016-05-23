'use strict';

/**
 * @ngdoc overview
 * @name invoiceClientApp
 * @description
 * # invoiceClientApp
 *
 * Main module of the application.
 */
 angular
 .module('invoiceClientApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'main',
  'about',
  'invoices',
  'invoice',
  'user',
  'resource.user',
  'gradjani',
  'gradjanin',
  'jcs-autoValidate'
  ])
 .config(function ($routeProvider) {
  $routeProvider
  .when('/', {
	  templateUrl: 'views/gradjanin-list.html',
	  controller: 'gradjaninListCtrl'
  })
  .when('/invoice-list', {
    templateUrl: 'views/invoice-list.html',
    controller: 'invoicesListCtrl'
  })
  .when('/invoice/:invoiceId', {
    templateUrl: 'views/invoice.html',
    controller: 'invoiceCtrl'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'gradjaninCtrl'
  })
  .when('/gradjanin-list', {
	  
	  templateUrl: 'views/gradjanin-list.html',
	  controller: 'gradjaninListCtrl'
	  
  })
  .when('/gradjanin/:gradjaninId', {
    templateUrl: 'views/gradjanin.html',
    controller: 'gradjaninCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
})
 //tricky deo
 .factory('authHttpResponseInterceptor',['$q','$location',function($q,$location){// fabrika koja pravi interceptor
  return {
    response: function(response){//ako smo dobili noramalan odgovor vratimo taj odgovor
      if (response.status === 401) {
        console.log("Response 401");
      }
      return response || $q.when(response);
    },
    responseError: function(rejection, x, y) {//ako smo dobili gresku
      if (rejection.status === 401) {//ako je greska 401 (korisnik nije prijavljen na sistem)
        console.log("Response Error 401",rejection);
        $location.path('/login');//redirektujemo se na login
      }
      return $q.reject(rejection);//i odbacimo zahtev
    }
  }
}])
 .config(['$httpProvider',function($httpProvider) {//interceptor dodamo u stek interceptora
  $httpProvider.interceptors.push('authHttpResponseInterceptor');
}])
 //imamo problem: koristimo $resource koji je wrapper oko $http
 //kada pristigne odgovor prvo se uradi transformResponse nad odgovorom
 //pa se onda presretne odgovor.
 //uz gresku sa servera pristigne tekstualni opis greske
 //"Not logged in"
 //ovaj opis greske ne moze da se konvertuje u JSON (pogeldaj slajd $resource - napisano sitnim slovima)
 //zbog toga moramo da izmenimo transformResponce 
 .run(['$http','$location',//to radimo u run, jer se izvrsava pre svega ostalog
  function($http, $location) {
    var parseResponse = function(response, headers, status) {//ova funkcija proba da konvertuje pristigli odgovor u JSON
      if(status===401){//ako je odgovor neautorizovan radimo redirekciju
        $location.path('login');
      }
      else{
        return response;//inace vratimo odgovor
      }
    };

    $http.defaults.transformResponse.unshift(parseResponse);//ovu funkciju stavimo na pocetak niza transformer funkcija
  }
  ])
 .controller('appCtrl', function($scope, User, $log, $location, $modal,$rootScope){
  $scope.logout = User.logout;
  $scope.isLoginPage = function () {
    return $location.path() === '/login';
  };


  $rootScope.current = "";
 /*var promise = CurrentUser.getCurrentUser();
   $scope.role = {};
   promise.then(function (data) {
     $log.info(data);
     $scope.role = data;
   });*/

  
  $scope.about = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl',
      size: size,
    });
  };



    
  

})


.run([
        'bootstrap3ElementModifier',
        function (bootstrap3ElementModifier) {
              bootstrap3ElementModifier.enableValidationStateIcons(true);
}])

 .run([
    'defaultErrorMessageResolver',
    function (defaultErrorMessageResolver) {
        // passing a culture into getErrorMessages('fr-fr') will get the culture specific messages
        // otherwise the current default culture is returned.
        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
          errorMessages['requiredMy'] = 'Obavezno polje!';
          
        });
    }
]);
