angular.module('controllers',[])
.controller('CloudController', ['$scope','Comments','PrepData','DrawChart', function($scope, Comments, PrepData, DrawChart){
	Comments.get('bonerpalooza')
	.then(function(array) {
		$scope.comments = array.data.data.children;
		return PrepData.parse(array.data.data.children);
	})
	.then(function(result) {
		$scope.setData(result);
		$scope.colorChart();
	});
	$scope.setData = function(data) {
		$scope.data = data;
		$scope.subreddits = $scope.data.datasets;
	};
	$scope.colorChart = function() {
		$scope.myChart = { "data": DrawChart.make($scope.data), "options": { bezierCurve:false } };
	};
}]);
//http://stackoverflow.com/questions/13937318/convert-angular-http-get-function-to-a-service
		/* make big string
		array.data.data.children.reduce(function(prev, comment){
				return prev += comment.data.body;
			}, '');	*/
