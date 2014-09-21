angular.module('controllers',[])
.controller('CloudController', ['$scope','Comments','PrepData','DrawChart', function($scope, Comments, PrepData, DrawChart){
	
	$scope.createChart = function(username) {
		Comments.get(username)
		.then(function(array) {
			console.log(array.data.data.children);
			$scope.comments = Comments.dates(array.data.data.children);
			return PrepData.parse($scope.comments);
		})
		.then(function(result) {
			$scope.setData(result);
			$scope.colorChart();
		});
	};
	$scope.setData = function(data) {
		$scope.data = data;
	};
	$scope.colorChart = function() {
		$scope.myChart = { "data": DrawChart.make($scope.data), "options": { bezierCurve:false,showTooltips:false } };
		//silly hacks: bezierCurve:false for error throwing; showTooltips:false for chart wonkiness on username change 
	};
}]);
//http://stackoverflow.com/questions/13937318/convert-angular-http-get-function-to-a-service
		/* make big string
		array.data.data.children.reduce(function(prev, comment){
				return prev += comment.data.body;
			}, '');	*/
