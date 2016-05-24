angular.module('resource.akt', ['ngResource'])
	.factory('Akt', function ($resource) {
	return $resource('http://localhost:8089/xws/api/akt/:id',null, {
        'update': { method:'PUT' }
    });
})