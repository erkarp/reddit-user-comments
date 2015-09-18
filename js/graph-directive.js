app.directive('graph', ['Graph', function (Graph) {
	return {
		restrict: 'E',
		scope: {
			data: '='
		},
		link: function(scope, element, attrs) { 
			var width = 600, height = 500, margin = 15;
		
			function drawGraph(data, xDomain, yDomain) {
			
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
					.rangePoints([0, width]);
				var y = d3.scale.linear()
					.domain([d3.max(yDomain),0])
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
				
				for (var line in data) {
					svg.selectAll("dot")
						.data(data[line])
						.enter().append("circle")
						.attr("r", 2)
						.attr("cx", function(d) { return x(d.x); })
						.attr("cy", function(d) { return y(d.y); })
						.classed(line, true)
						.style("fill", 'red');
				};
				
				for (var line in data) {
					svg.selectAll('.'+line)
						.style('fill', randomColor({ 
						luminosity: 'bright', 
						format: 'rgb' 
					}));
				}
			};
			
			function colorDots(svg, data) {
				console.log(svg);
				console.log(data);

			};
			
			scope.$watch(function() { return scope.data; }, function(value) {
				console.log(value);
				if (value) {
					var xDomain = Graph.getXAxis(value);
					var yDomain = Graph.getYAxis(value);
					var data = Graph.getSubLines(value);
					console.log(data);
					console.log(xDomain);
					console.log(yDomain);
					drawGraph(data, xDomain, yDomain);
				}
			});
			
			
		}
	}
	
}]);