
app.value('helloValue','hello, angular value');
app.value('helloValue','hello, angular value2');

app.controller("myCtrl",['$scope','helloValue',function($scope,helloValue){
  $scope.getName = helloValue;
}]);
