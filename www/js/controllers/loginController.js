app.controller('loginController',['$scope','$state', 'UserService', function($scope, $state, UserService){

  $scope.logUser=function(user){

    if(user){
  		var obj={};
      UserService.getAllUsers().then(function(res){
      	obj.users=res
        console.log(obj.users)

        for(var i=0 ; i < obj.users.length ; i++ ){

          if(obj.users[i].login === user.login && user.password ===  obj.users[i].password){

            UserService.setCurrentUser(obj.users[i]);
            $scope.$parent.init()
            $state.go('requests');
            return obj.users[i];

          }
        }
      });
    }
  }


  $scope.getUsers=function(){
    return UserService.getUsers()
  }



}])
