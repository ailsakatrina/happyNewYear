var myApp = angular.module("myApp", ['ui.router']);  
myApp.config(function ($stateProvider, $urlRouterProvider) {       
    $urlRouterProvider.when("", "/PageTab");       
    $stateProvider        
        .state("PageTab", {             
            url: "/PageTab", 
            templateUrl:"partial/PageTab.html"             
        })    
         .state("PageTab.Page1", {             
            url:"/Page1",             
            templateUrl: "partial/Page1.html"         
        })         
         .state("PageTab.Page2", {             
            url:"/Page2",             
            templateUrl: "partial/Page2.html"         
        })         
         .state("PageTab.Page3", {             
            url:"/Page3",             
            templateUrl: "partial/Page3.html"         
        })
 });