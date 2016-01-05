app.controller('CloudController', ['$scope', 'Comments', 'Main',
function($scope, Comments, Main){

	$scope.createChart = function(user) {
		$scope.setSub = 'all';
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
			Main.analyze(result);

		},
    function (red) {
			$scope.errorClass = 'red';
    });
	};

	$scope.color = function() {
		Main.color();
	};

}]);
