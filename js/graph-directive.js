app.directive('graph', ['Graph', function (Graph) {
	return {
		restrict: 'E',
		scope: {
			data: '='
		},
		link: function(scope, element, attrs) { 
			var width = 500, height = 400, margin = 15;
		
			function drawGraph(xDomain, yDomain) {
			
				var svg = d3.select(element[0])
					.append('svg').style({
						'max-width': '100%',
						'width': width + 'px',
						'height': height + 'px',
						'border': '1px solid red',
						'margin-left': margin
					});
				
				var x = d3.scale.ordinal()
					.domain(xDomain)
					.rangePoints([0, width - margin]);
				var y = d3.scale.linear()
					.domain([0, d3.max(yDomain)])
					.range([0, height]);
				
				var xAxis = d3.svg.axis()
					.scale(x)
					.orient("top");
				var yAxis = d3.svg.axis()
					.scale(y)
					.orient("right");
				
				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + height + ")")
					.call(xAxis);
				svg.append("g")
					.attr("class", "y axis")
					.call(yAxis);

			};
			
			scope.$watch(function() { return scope.data; }, function(value) {
				console.log(value);
				if (value) {
					var xDomain = Graph.getXAxis(value);
					var yDomain = Graph.getSubLines(value);
					console.log(xDomain);
					console.log(yDomain);
					drawGraph(xDomain, yDomain);
				}
			});
			
			
		}
	}
	
}]);