app.controller('mainController',['$scope','$state', function($scope, $state){

  $steps=["users","places","urgency"]
  $scope.users=[

      {name:"chris", url:"img/cat1.jpg"},

      {name:"boris", url:"img/cat2.jpg"},

      {name:"johnson",url:"img/cat3.jpg"}

      ]

  $scope.places=[

      {name:"main stand", url:"img/cat4.jpg"},

      {name:"asdasd", url:"img/cat5.jpg"},

      {name:"qqqq",url:"img/cat6.jpg"}

      ]
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
}])
