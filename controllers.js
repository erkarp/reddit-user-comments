angular.module('controllers',[])
.controller('CloudController', ['$scope','Comments','PrepData','DrawChart', function($scope, Comments, PrepData, DrawChart){
	Comments.get('bonerpalooza')
	.then(function(array) {
		$scope.comments = array.data.data.children;
		return PrepData.parse(array.data.data.children);
	})
	.then(function(data) {
		//problem 1: was trying to save to $scope.myChart.data (bad documentation)
		//problem 2: tried to treat a directive as a factory
		//problem 3: hadn't injected chartjs-directive into MyApp definition
		//problem 4: included <canvas> element where one was supposed to be created 
		$scope.myChart = { "data": DrawChart.make(data), "options": { bezierCurve:false } };
		$scope.subreddits = data.datasets;
		console.log($scope.myChart);
	});
}]);
//http://stackoverflow.com/questions/13937318/convert-angular-http-get-function-to-a-service
		/* make big string
		array.data.data.children.reduce(function(prev, comment){
				return prev += comment.data.body;
			}, '');	*/
