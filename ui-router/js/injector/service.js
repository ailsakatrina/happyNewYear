
app.service('helloService',function(){
  this.name='hello, angular service';
  this.getName=function(){
    return this.name;
  }
});

app.controller("myCtrl",['$scope','helloService',function($scope,helloService){
  $scope.getName = helloService.getName();
}]);
