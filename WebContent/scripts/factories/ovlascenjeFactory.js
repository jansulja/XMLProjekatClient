angular.module('resource.ovlascenje', ['ngResource'])
	.factory('Ovlascenje', function ($resource) {
	return $resource('http://localhost:8089/xws/api/ovlascenje/:ovlascenjeId');
})