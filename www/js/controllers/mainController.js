app.controller('mainController',['$scope','$state','$ionicPopup', '$http', 'UserService', function($scope, $state, $ionicPopup, $http, UserService){

  $scope.places=[
    {name:"main stand", url:"img/cat4.jpg"},
    {name:"asdasd", url:"img/cat5.jpg"},
    {name:"qqqq",url:"img/cat6.jpg"}
  ]

    $scope.sending={}

    $scope.urgencyStates = ["red","orange","yellow"]

    $scope.init = function(){
      $scope.getUsers();
      $scope.getUserRequests();
      $state.go('requests')

    }
    $scope.goTo = function(state){
      $state.go(state)
    }
    $scope.getCurrentUser = function(){
      return UserService.getCurrentUser()
    }
    // todo delete
    $scope.done = function(request){
      var index = $scope.receivedRequests.indexOf(request)
      $scope.receivedRequests.splice(index, 1);
    }

    $scope.showConfirm = function(request) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete requst',
        template: 'Are you sure you want to delete this request?'
      });
      confirmPopup.then(function(res) {
        if(res) {
          console.log('You are sure');

          $scope.done(request);

        } else {
          console.log('You are not sure');
        }
      });
    };

    $scope.getUsers=function (){
        UserService.getAllUsers().then(function(users){
          $scope.allUsers = users;
          console.log(users)
        })
    }

    $scope.getUserRequests=function(){
        $scope.req = UserService.getCurrentUserRequests()
    }


    $scope.select=function(option,req){
      $scope.sending[option]=req
      console.log($scope.sending)
    }

    $scope.selectUser=function (reciever){
        $scope.sending.reciever=reciever["_id"];

        console.log($scope.sending)
    }
    $scope.selectPlace=function (place){
        $scope.sending.place=place.name;
        console.log($scope.sending)
    }

    $scope.selectUrgency=function (urgency){
        $scope.sending.urgency=urgency;
        console.log($scope.sending)
    }

    $scope.sendRequest=function(){
        $scope.sending.sender=UserService.getCurrentUser().login;
        console.log($scope.sending);
        var id = $scope.sending.reciever;
        var request =  $scope.sending;
        console.log(id)

        UserService.sendRequest(id,request).then(function(){
          $state.go('requests')
        })
    }



}])
