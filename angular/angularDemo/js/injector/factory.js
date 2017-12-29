
app.factory('helloFactory',function(){
  var name='hello, angular factory';
  function getName(){
    return name;
  }
  return {
    getName:getName
  }
});

app.controller("myCtrl",['$scope','helloFactory',function($scope,helloFactory){
  $scope.getName = helloFactory.getName();
}]);
