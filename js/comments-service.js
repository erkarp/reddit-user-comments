
app.service('Comments', function($http) {
  this.async = function(user) {
    // $http returns a promise, which has a then function, which also returns a promise
    var promise = $http.get('http://www.reddit.com/user/' + user + '/comments/cjvkpaf.json?limit=100').then(function (response) {
      // The then function here is an opportunity to modify the response
      console.log(response);
      // The return value gets picked up by the then in the controller.
      return response.data.data.children;
    });
    // Return the promise to the controller
    return promise;
  }
});
/*

app.factory('Comments', function($http) {
  var promise;
  var myService = {
    async: function(user) {
      if ( !promise ) {
        // $http returns a promise, which has a then function, which also returns a promise
        promise = $http.get('http://www.reddit.com/user/' + user + '/comments/cjvkpaf.json?limit=100').then(function (response) {
          // The then function here is an opportunity to modify the response
          console.log(response);
          // The return value gets picked up by the then in the controller.
          return response.data;
        });
      }
      // Return the promise to the controller
      return promise;
    }
  };
  return myService;
});

*/
