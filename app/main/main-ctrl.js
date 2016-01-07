app.controller('MainCtrl', ['$log', '$rootScope', '$scope', 'Data', 'Color',
function($log, $rootScope, $scope, Data, Color) {

  $scope.setSub = function(sub) {
		$rootScope.chosenSub = sub;
	};

  $scope.setSub('all');

}]);
