angular.module('seed-db').config(function($urlRouterProvider){
    // when there is an empty route, redirect to /index   
    $urlRouterProvider.when('', '/seedlist')
	
})
