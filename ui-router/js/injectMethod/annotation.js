var myCtrl2 = function(myPara){
  myPara.getName = '声明式注入法';
}

myCtrl2.$inject = ['$scope'];

app.controller("myCtrl2",myCtrl2);
