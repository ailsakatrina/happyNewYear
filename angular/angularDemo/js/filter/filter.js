app.controller("myCtrl6",function($scope){
  $scope.people=[
    {name:'xxt', city:'shenzhen'},
    {name:'zjj',city:'hangzhou'},
    {name:'gjl',city:'DC'}];
});

app.filter("dotted",function(){
  return function(txt){
    return txt.split('').join('.');
  }
});
