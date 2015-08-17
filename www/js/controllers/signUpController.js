app.controller('signUpController',['$scope','UserService',function($scope, UserService){


  function User(login, password , email){
    this.login=login;
    this.password=password;
    this.email=email
  }

  $scope.cancel=function(){
    $scope.user.login="";
    $scope.user.email="";
    $scope.user.password="";
    // $scope.user.repeatPassword="";
  }

  $scope.addNewUser = function(user) {
    var user = new User(user.login, user.password, user.email )

    UserService.addUser(user).then(function(data){
      // $scope.initFirst();
      $scope.cancel()
      console.log(data);
    });
  }


}]);
