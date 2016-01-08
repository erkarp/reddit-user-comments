app.controller('CloudController', ['$scope', '$rootScope', '$location', 'Comments', 'Color',
function($scope, $rootScope, $location, Comments, Color){

	$scope.createChart = function(user) {
		if (user == undefined) {
			user = $scope.username;
		}

		$scope.username = user;
		$scope.setSub = 'all';
		$scope.comments = false;
		$scope.error = false;
		$rootScope.subColors = [];

		Comments.async(user)
		.then(function(result) {

			if (result[11] == undefined) {
				$scope.error = 'warning';
				return;
			}
			$scope.error = false;
	    $scope.comments = result;
	    $scope.data = Comments.analyze(result);

			var ref = $location.url();
			$location.url('/' + user);
		},
    function (red) {
			$scope.error = 'danger';
    });
	};


	if ($location.url().length > 1) {
		$scope.username = $location.url().slice(1);
		$scope.createChart($scope.username);
	}


	$scope.color = function() {
		Color.reddits();
	};

}]);
