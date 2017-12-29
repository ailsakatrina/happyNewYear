   
    app.filter("hello",function(){
      return function(txt){
        return txt.split('').join('.');
      }
    });

   /* app.config(function($stateProvider,$urlRouterProvider){
    	$urlRouterProvider.otherwise('/home');
    	$stateProvider
    		.state('home',{
    			url:'/home',
    			templateUrl:'filter.html'
    		})
    });*/
