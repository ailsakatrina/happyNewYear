app.provider('helloProvider',function(){
  return {
    $get:function(){
      var name='hello, angular provider';
      function getName(){
        return name;
      }
      return {
        getName : getName
      }
    }
  }
});

app.controller("myCtrl",['$scope','helloProvider',function($scope,helloProvider){
  $scope.getName = helloProvider.getName();
}]);
