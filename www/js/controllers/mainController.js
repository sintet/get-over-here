app.controller('mainController',['$scope','$state','$ionicPopup', '$http', function($scope, $state,$ionicPopup, $http){

  $steps=["users","places","urgency"]

  $scope.users=[

      {name:"chris", url:"img/cat1.jpg"},

      {name:"boris", url:"img/cat2.jpg"},

      {name:"johnson",url:"img/cat3.jpg"},

      ]

  $scope.places=[

      {name:"main stand", url:"img/cat4.jpg"},

      {name:"asdasd", url:"img/cat5.jpg"},

      {name:"qqqq",url:"img/cat6.jpg"}

      ]
      $scope.goToMain=function(){
          $state.go("requests")

      }
      $scope.goToUsers=function(){
          $state.go("send.users")

      }
      $scope.goToUsers=function(){
          $state.go("send.users")

      }
      $scope.goToPlaces=function(){
          $state.go("send.places")

      }
      $scope.goToUrgency=function(){
          $state.go("send.urgency")

      }
    $scope.urgencyStates=["red","orange","yellow"]


    $scope.receivedRequests=[
        {
          time: "11:40",
          receiver : {name:"Johnson"},
          sender : {name:"Boris",url:"img/cat2.jpg"},
          place : {name:"main stand", url:"img/cat4.jpg"},
          urgency : "red"
        },
        {
          time: "12:00",
          receiver : {name:"Johnson"},
          sender : {name:"Boris",url:"img/cat1.jpg"},
          place : {name:"qqqq", url:"img/cat6.jpg"},
          urgency : "yellow"
        },
        {
          time: "12:20",
          receiver : {name:"Johnson"},
          sender : {name:"Alah",url:"img/cat3.jpg"},
          place : {name:"asdasd", url:"img/cat5.jpg"},
          urgency : "orange"
        }


        ]

      $scope.done=function(request){
        var index=  $scope.receivedRequests.indexOf(request)
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
            $scope.done(request)
          } else {
            console.log('You are not sure');
          }
        });
      };

    $scope.cat=function (){
      $http.get('api/cats').success(function(resp){
        console.log(resp)
      })


    }





}])
