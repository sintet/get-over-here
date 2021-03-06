// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('getOverHere', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/main");
    $stateProvider
      .state('requests',{
          url:"/main",
          templateUrl:"views/requests.html"

      })
      .state('send',{
        url:'/send',
        templateUrl:'views/send.html',
        controller:'sendRequest'
      })
      // todo
      // .state('send.step',{
      //   url:'/:step',
      //   templateUrl:'views/sendTemplate.html',
      //
      // })
      .state('send.users',{
        url:'/users',
        templateUrl: 'views/sendUsers.html',
        // controller:'sendUsersController'
      })
      .state('send.places',{
        url:'/places',
        templateUrl: 'views/sendPlaces.html'
      })
      .state('send.urgency',{
        url:'/urgency',
        templateUrl: 'views/sendUrgency.html'
      })

      .state('signUp',{
          url:'/signUp',
          templateUrl:'views/signUp.html',
          controller:'signUpController'
      })
      .state('login',{
          url:'/login',
          templateUrl:'views/login.html',
          controller:'loginController'
      })


    })
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  })
})
