app.controller('MainCtrl', ['$log', '$rootScope', '$scope', 'PrepData', 'Color',
function($log, $rootScope, $scope, PrepData, Color) {

  $scope.setSub = function(sub) {
		$rootScope.chosenSub = sub;
	};


  this.analyze = function(data) {
  }

}]);
