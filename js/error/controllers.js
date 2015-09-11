app.controller('CloudController', ['$rootScope', '$scope', 'PrepData','DrawChart', 'Comments', 'Color', function($rootScope, $scope, PrepData, DrawChart, Comments, Color){
	
	var allComments; 
	
	$scope.setSub = function(sub) {
		$rootScope.chosenSub = sub;
		
		/*
		if (sub == 'all') {
			$scope.comments = allComments;
		} else {
			$scope.comments = [
				allComments.indexOf['data' + [sub]]
			]; 
		}
		*/
	};
	
	$scope.createChart = function(user) {
		$rootScope.chosenSub = 'all'; 
		$rootScope.subColors = [];
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
			allComments = result;  
			
			$scope.data = PrepData.parse(result);
			$scope.colorChart();
		},
        function (red) {
			$scope.errorClass = 'red';
        }); 
	};
	
	$scope.color = function() {
		Color.reddits(); 
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