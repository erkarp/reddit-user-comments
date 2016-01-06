app.controller('CloudController', ['$scope', '$rootScope', 'Comments', 'Color',
function($scope, $rootScope, Comments, Color){

	$scope.createChart = function(user) {
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
			console.dir($scope.comments);
			console.dir($scope.data);

		},
    function (red) {
			$scope.errorClass = 'red';
    });
	};

	$scope.color = function() {
		Color.reddits();
	};

}]);
