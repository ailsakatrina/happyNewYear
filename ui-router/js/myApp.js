var app = angular.module("app",['ui.router']);

app.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.when('','/home');
	$urlRouterProvider.when('/home/myInject','/home/myInject/container');
	$urlRouterProvider.when('/home/myRouter','/home/myRouter/computer');

	

	$stateProvider
		.state('home',{
			url:'/home',
			views:{
				'':{
					templateUrl:'views/home.html'
				},
				'title@home':{
					template:'<h3>angular note</h3>'
				},
				'nav@home':{
					templateUrl:'views/nav.html'
				},
				'main@home':{
					templateUrl:'views/firstPage.html'
				}

			}

		})


		.state('home.myInject',{
			url:'/myInject',
			views:{
				'main@home':{
					templateUrl:'views/myInject.html'
				}
			}
		})
		.state('home.myInject.container',{
			url:'/container',
			templateUrl:'views/myInjectContainer.html'
				
		})
		.state('home.myInject.method',{
			url:'/method',
			templateUrl:'views/myInjectMethod.html'
		})



		.state('home.myDirective',{
			url:'/myDirective',
			views:{
				'main@home':{
					templateUrl:'views/myDirective.html'
				}
			}
		})
		.state('home.myBibind',{
			url:'/myBibind',
			views:{
				'main@home':{
					templateUrl:'views/myBibind.html'
				}
			}
		})
		.state('home.myScope',{
			url:'/myScope',
			views:{
				'main@home':{
					templateUrl:'views/myScope.html'
				}
			}
		})
		.state('home.myFilter',{
			url:'/myFilter',
			views:{
				'main@home':{
					templateUrl:'views/myFilter.html'
				}
			}
		})
		.state('home.myValidation',{
			url:'/myValidation',
			views:{
				'main@home':{
					templateUrl:'views/myValidation.html'
				}
			}
		})
		.state('home.myAPI',{
			url:'/myAPI',
			views:{
				'main@home':{
					templateUrl:'views/myAPI.html'
				}
			}
		})
		.state('home.myRouter',{
			url:'/myRouter',
			views:{
				'main@home':{
					templateUrl:'views/myRouter.html'
				}
			}
		})
		.state('home.myRouter.computer',{
			url:'/computer',
			template:'这是电脑分类页面'
		})
		.state('home.myRouter.printers',{
			url:'/printers',
			template:'这是打印机页面'
		})
		.state('home.myRouter.blabla',{
			url:'/blabla',
			template:'这是其他页面'
		})
});