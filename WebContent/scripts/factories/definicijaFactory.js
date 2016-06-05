angular.module('resource.definicija', ['ngResource'])
	.factory('Definicija', function ($resource) {
	return $resource('http://localhost:8089/xws/api/definicija/:definicijaId');
})