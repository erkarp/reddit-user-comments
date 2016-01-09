app.controller('CloudController', ['$scope', '$rootScope', '$location', 'Comments', 'Color', 'Scroll',
function($scope, $rootScope, $location, Comments, Color, Scroll){

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

		if ($location.url().indexOf("#") > -1) {
			var i = $location.url().indexOf("#");
			$location.url($location.url().slice(1,i));
		}

		$scope.username = $location.url().slice(1);
		$scope.createChart($scope.username);
	}

	$scope.scroll = function() {
		Scroll.to('main');
	}

	$scope.color = function() {
		Color.reddits();
	};

}]);
