app.controller('MainCtrl', ['$rootScope', '$scope', 'PrepData', 'Color',
function($rootScope, $scope, PrepData, Color) {

  $scope.setSub = function(sub) {
		$rootScope.chosenSub = sub;
	};

  this.color = function() {
    Color.reddits();
  };

  $scope.color = this.color;
	$rootScope.subColors = [];

  this.analyze = function(data) {
    $scope.comments = result;
    $scope.data = PrepData.parse(result);
  }

}]);
