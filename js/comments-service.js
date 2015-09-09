app.service('Comments', function($http) {
  this.async = function(user) {
	  
	  var promise = $http.get('http://www.reddit.com/user/' + user + '/comments/cjvkpaf.json?limit=100');
	  
	.then(function (response) {
		return response.data.data.children;
    });

    return promise;
  }
});
