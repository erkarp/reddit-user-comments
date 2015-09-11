app.directive('graph', ['$rootScope', 'Graph', 'Color', function ($rootScope, Graph, Color) {
	return {
		restrict: 'E',
		scope: {
			data: '='
		},
		link: function(scope, element, attrs) { 
			var margin = { right: 0, bottom: 25, left: 30, top: 5 },
				width = 600 - margin.right - margin.left, 
				height = 500 - margin.top - margin.bottom;
		
			function drawGraph(data, xStyle, xDomain, yDomain) {
			
				var svg = d3.select(element[0])
					.append('svg')
    				.attr('width', width + margin.right + margin.left)
    				.attr('height', height + margin.top + margin.bottom);
				
				var xMax = xDomain[0];
				var xMin = xDomain[xDomain.length-1];
				
				var x = d3.time.scale()
					.domain([xMin, xMax])
					.range([margin.left, width+margin.left]);
				
				var y = d3.scale.linear()
					.domain([d3.max(yDomain),d3.min(yDomain)])
					.range([margin.bottom, height+margin.top]);
				
				var xAxis = d3.svg.axis()
					.scale(x)
					.ticks(10)
					.orient("bottom")
					.tickFormat(d3.time.format(xStyle));
				var yAxis = d3.svg.axis()
					.scale(y)
					.orient("left");
				
				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + (height+margin.top) + ")")
					.call(xAxis);
				svg.append("g")
					.attr("class", "y axis")
					.attr("transform", "translate(" + (margin.left) + ", 0)")
					.call(yAxis);
				
				for (var line in data) {
					svg.selectAll("dot")
						.data(data[line])
						.enter().append("circle")
						.attr("r", 3)
						.attr("cx", function(d) { return x(d.x); })
						.attr("cy", function(d) { return y(d.y); })
						.classed(line, true);
				};
				return svg;
			};
			
			scope.$watch(function() { return scope.data; }, function(value) {
				if (value) {
					var xDom = Graph.getXAxis(value);
					var yDom = Graph.getYAxis(value);
					var data = Graph.getSubLines(value);
					var svg = drawGraph(data, xDom.style, xDom.array, yDom);
					Color.reddits(data);
				}
			});
			
			scope.$watch(function() {
				
				if ($rootScope.subColors != undefined) {
					for (var sub in $rootScope.subColors) {
						return $rootScope.subColors[sub];
					}
				}
				
			}, function() {
					
				for (var sub in $rootScope.subColors) {
					d3.selectAll('circle.' + sub)
						.style('fill', $rootScope.subColors[sub]);
				}
					
			});
			
			
		}
	}
	
}]);