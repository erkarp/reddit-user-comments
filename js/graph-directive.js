app.directive('graph', ['Graph', function (Graph) {
	return {
		restrict: 'E',
		scope: {
			data: '='
		},
		link: function(scope, element, attrs) { 
			
			var graph = d3.select(element[0]);
			var xScale, yScale;
			
			console.log('graphing...');
			var width = 500,
				height = 400;
			
			graph.append('svg').style({
				'width': width + 'px',
				'height': height + 'px',
				'max-width': '100%',
				'border': '1px solid red',
			});
			
			scope.$watch(function() { return scope.data; }, function(value) {
				console.log(value);
				if (value) {
					var lines = Graph.getSubLines(value);
					var xAxis = Graph.getXAxis(value);
					console.log(lines);
					console.log(xAxis);
				}
			});
			
			
		}
	}
	
}]);