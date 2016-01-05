app.controller('CloudController', ['$scope', '$controller', 'Comments',
function($scope, Comments, Color){

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
	    $scope.data = PrepData.parse(result);

		},
    function (red) {
			$scope.errorClass = 'red';
    });
	};

	$scope.color = function() {
		Color.reddits();
	};

}]);
