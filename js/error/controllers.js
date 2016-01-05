app.controller('CloudController', ['$rootScope', '$scope', 'PrepData', 'Comments', 'Color', function($rootScope, $scope, PrepData, Comments, Color){

	var allComments;

	$scope.setSub = function(sub) {
		$rootScope.chosenSub = sub;
	};

	$scope.createChart = function(user) {
		$rootScope.chosenSub = 'all';
		$rootScope.subColors = [];
		$scope.comments = false;
		$scope.errorClass = false;
		$scope.user = user;

		Comments.async(user)
		.then(function(result) {

			if (result[11] == undefined) {
				$scope.errorClass = 'orange';
				return;
			}

			$scope.errorClass = false;
			$scope.comments = result;

			allComments = result;
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
