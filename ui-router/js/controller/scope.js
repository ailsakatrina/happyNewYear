app.controller("myCtrl5",function($scope,$rootScope){
  $scope.myName = $rootScope.myName;
  $scope.control = true;
  $scope.check = true;
  $scope.toggle = function(){
    $scope.control = !$scope.control;
  }
});
