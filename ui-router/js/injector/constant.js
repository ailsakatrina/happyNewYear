
app.constant('helloConstant','hello, angular constant');
app.constant('helloConstant','hello, angular constant2');

app.controller("myCtrl",['$scope','helloConstant',function($scope,helloConstant){
  $scope.getName = helloConstant;
}]);
