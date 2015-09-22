app.directive('graph', ['Graph', function (Graph) {
	return {
		restrict: 'E',
		scope: {
			data: '='
		},
		link: function(scope, element, attrs) { 
			var margin = { right: 0, bottom: 25, left: 25, top: 5 },
				width = 600 - margin.right - margin.left, 
				height = 500 - margin.top - margin.bottom;
		
			function drawGraph(data, commentDates, yDomain) {
			
				var svg = d3.select(element[0])
					.append('svg')
    				.attr('width', width + margin.right + margin.left)
    				.attr('height', height + margin.top + margin.bottom)
					.style({ 'border': '1px solid red' });
				
				var xDomainStyle = Graph.reduceX(commentDates);
				var xDomain = xDomainStyle[0], xStyle = xDomainStyle[1];
				
				var xMax = xDomain[0];
				var xMin = xDomain[xDomain.length-1];
				
				var x = d3.time.scale()
					.domain([xMin, xMax])
					.range([margin.left, width-margin.right]);
				
				var y = d3.scale.linear()
					.domain([d3.max(yDomain),d3.min(yDomain)])
					.range([margin.top, height+margin.top]);
				
				var xAxis = d3.svg.axis()
					.scale(x)
					.orient("bottom")
					.tickFormat(xStyle);
				var yAxis = d3.svg.axis()
					.scale(y)
					.orient("right");
				
				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + (height+margin.top) + ")")
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
				return svg;
			};
			
			function colorDots(svg, data) {
				for (var line in data) {
					svg.selectAll('.'+line)
						.style('fill', randomColor({ 
						luminosity: 'bright', 
						format: 'rgb' 
					}));
				}
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
					var svg = drawGraph(data, xDomain, yDomain);
					colorDots(svg, data);
				}
			});
			
			
		}
	}
	
}]);