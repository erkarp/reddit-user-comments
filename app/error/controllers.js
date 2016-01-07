app.controller('CloudController', ['$scope', '$rootScope', '$location', 'Comments', 'Color',
function($scope, $rootScope, $location, Comments, Color){

	$scope.createChart = function(user) {
		if (user == undefined) {
			user = $scope.username;
		}

		$scope.setSub = 'all';
		$scope.comments = false;
		$scope.errorClass = false;
		$rootScope.subColors = [];

		Comments.async(user)
		.then(function(result) {

			if (result[11] == undefined) {
				$scope.errorClass = 'orange';
				return;
			}
			$scope.errorClass = false;
	    $scope.comments = result;
	    $scope.data = Comments.analyze(result);

			var ref = $location.url();
			$location.url('/' + user);
		},
    function (red) {
			$scope.errorClass = 'red';
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
