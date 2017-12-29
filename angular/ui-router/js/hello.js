var myApp = angular.module('helloworld', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when("/", "/about");   
	$stateProvider
	  .state('hello',{
	    url: '/hello',
	    template: '<h3>hello world!</h3>'
	    }) 
	  .state('about',{
	  	 url: '/about',
	    template: '<h3>Its the UI-Router hello world app!</h3>'
	  }) 
});