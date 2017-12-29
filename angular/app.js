 var app=angular.module("APP",['ui.router']);
app.config(function($stateProvider,$urlRouterProvider){
    	$urlRouterProvider.otherwise('/home');
    	$stateProvider
    		.state('home',{
    			url:'/home',
    			templateUrl:'filter.html'
    		})
    });