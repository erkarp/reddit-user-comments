app.controller('CloudController', ['$rootScope', '$scope', 'Graph', 'PrepData','DrawChart', 'Comments', function($rootScope, $scope, Graph, PrepData, DrawChart, Comments){
	
	$scope.setSub = function(sub) {
		$rootScope.chosenSub = sub;
	};
	
	$scope.createChart = function(user) {
		$rootScope.chosenSub = 'all'; 
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
			
			Graph.getSubLines($scope.comments);
			
			$scope.data = PrepData.parse(result);
			$scope.colorChart();
				
		},
        function (red) {
			$scope.errorClass = 'red';
        }); 
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