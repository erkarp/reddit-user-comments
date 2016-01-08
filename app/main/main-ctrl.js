app.controller('MainCtrl', ['$rootScope', '$scope', 'Data', 'Color',
function($rootScope, $scope, Data, Color) {

  $scope.setSub = function(sub) {
		$rootScope.chosenSub = sub;
	};

  $scope.setSub('all');

}]);
