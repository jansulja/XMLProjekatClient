angular.module('resource.gradjani', ['ngResource'])
	.factory('Gradjanin', function ($resource,$log) {
		$log.info('INSERT at: ' + new Date());	
	return $resource('http://localhost:8080/xws/api/gradjanin/:gradjaninId',null, {
        'update': { method:'PUT' }
    });
})