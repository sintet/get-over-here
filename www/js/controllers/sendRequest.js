app.controller('sendRequest', ['$scope' , 'UserService' , function($scope, UserService){

  $scope.steps=_.keys($scope.stepObj)


  $scope.stepObj={
      users : [],
      places : [],
      urgency : []
  }
  _.forIn ($scope.stepObj,function(value,keys){
      console.log(keys)
      console.log(value)
  })

  $scope.prevStep;
  $scope.nextStep;
  $scope.i = 0;
  $scope.currentStep = $scope.steps[$scope.i];

  // $scope.things=$scope.$parent

  $scope.count=function(){
      $scope.i++
  }



}])
