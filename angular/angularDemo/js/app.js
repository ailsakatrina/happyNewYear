var app = angular.module("app",['ngRoute']);


app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
        	templateUrl:'js/1.html'
        })
        .when('/computers',{template:'这是电脑分类页面'})
        .when('/printers',{template:'这是打印机页面'})
        .otherwise({redirectTo:'/'});
}]);