app.controller("myCtrl8",function($scope){
  $scope.blur = function(){
    $scope.testStr = angular.isString($scope.input);
    $scope.testNum = angular.isNumber($scope.input);
    $scope.testNum2 = !isNaN($scope.input);
  }

});
