app.directive("hello",function(){
  return {
    restrict: 'E',
    template: '<h4>this is hello command defined by user</h4>',
    replace: true
  }
});

app.controller("myCtrl3",['$scope',function(myPara){
  myPara.getName = '内联式注入法';
}]);
