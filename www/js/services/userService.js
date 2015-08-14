app.factory('UserService', ['$http','$q', function($http , $q){

    var obj={}

      // obj.getUsers= function ( ){
      //   return JSON.parse(localStorage["$scope.users"] || '[]');
      //
      // }

      obj.getCurrentUser=function(){
        return JSON.parse(localStorage["currentUser"] || '[]');
      }

      obj.getCurrentUserRequests=function(){
          return obj.getCurrentUser().requests
      }

      obj.setCurrentUser=function(currentUser){
          localStorage.currentUser=JSON.stringify(currentUser)
      }

      obj.putUserIntoLocalStorage=function (users){
        var cur =obj.getCurrentUser()
        for (var i = 0 ; i < users.length; i++){
            if(users[i].login ===  cur.login){
              users[i]=cur;
              localStorage["$scope.users"]=JSON.stringify(users);
          }
        }
      }

      obj.getAllUsers=function (){
        var deferred = $q.defer();
        $http.get('api/users')
          .success(function(resp){
            deferred.resolve(resp);
          })
          .error(function(error){
            deferred.reject(error);
          })

          return deferred.promise;
      }
      obj.addUser = function (user){
        var deferred = $q.defer();
        $http.post('api/users', user)
          .success(function(resp){
    				deferred.resolve(resp);
          })
          .error(function(error){

    				deferred.reject(error);
    			})

          return deferred.promise;
      }

      obj.sendRequest = function (id, request){
        var deferred = $q.defer();
        $http.post('api/users/'+id, request)
          .success(function(resp){
    				deferred.resolve(resp);
          })
          .error(function(error){
    				deferred.reject(error);
    			})
          return deferred.promise;
      }

    return obj;

}])
