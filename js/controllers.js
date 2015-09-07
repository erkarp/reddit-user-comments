app.controller('CloudController', ['$scope','$http','PrepData','DrawChart', function($scope, $http, PrepData, DrawChart){

	$scope.chosenSub = 'all';
	
	$scope.setSub = function(sub) {
		$scope.chosenSub = sub;
	};
	
	$scope.createChart = function(user) {
		$scope.comments = false; 
		$scope.errorClass = false;
		$scope.user = user; 
		
		$http.get('http://www.reddit.com/user/' + user + '/comments/cjvkpaf.json?limit=100')
		.then(function(array) {
			$scope.comments = array.data.data.children;
			
			if ($scope.comments[11] !== undefined) {
				$scope.errorClass = false;
				return PrepData.parse($scope.comments);
			} else { 
				$scope.errorClass = 'orange';
				return false;
			}
		})
		.then(function(result) {
			if (result) {
                console.dir(result);
				$scope.setData(result);
				$scope.colorChart();
			}
		},
        function (red) {
			$scope.errorClass = 'red';
        });
	};
	
	$scope.setData = function(data) {
		$scope.data = data;
	};
	
	$scope.colorChart = function() {
		$scope.myChart = { 
			"data": DrawChart.make($scope.data), 
			"options": { 
				bezierCurve:false, //silly hacks: bezierCurve:false for error throwing; 
				showTooltips:false //showTooltips:false for chart wonkiness on username change 
			} 
		};
	};
}]);
//http://stackoverflow.com/questions/13937318/convert-angular-http-get-function-to-a-service
		/* make big string
		array.data.data.children.reduce(function(prev, comment){
				return prev += comment.data.body;