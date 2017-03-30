(function(){
    
    var userRepoService = function($http){
      
      var getUsers = function(username){
           // return $http.get("https://hsta.mybluemix.net/select")
             return $http.get("http://localhost:6001/select")
                        .then(function(response){
                           return response.data; 
                        });
      };
  
      return {
          get: getUsers
      };
        
    };
    
    var module = angular.module("postExample");
    module.factory("userRepoService", userRepoService);
    
}());