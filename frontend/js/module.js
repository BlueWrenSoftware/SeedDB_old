angular.module('seed-db', ['ui.router'])
    .config(['$httpProvider', function($httpProvider) {
	console.log($httpProvider.defaults.headers.post);
    }]);
