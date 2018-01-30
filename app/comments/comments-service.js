app.service('Comments', function($http, Data) {
  return {
    async: function(user) {
  	   var promise = $http.get('http://www.reddit.com/user/' + user + '/comments.json?limit=100')

  	  .then(function (response) {
  		    return response.data.data.children;
      });

      return promise;
    },

    analyze: function(data) {
      return Data.parse(data);
    }
  };
});
