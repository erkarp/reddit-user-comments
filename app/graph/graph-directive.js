app.directive('graph', ['$rootScope', 'Graph', 'Color', 'Scroll',
function ($rootScope, Graph, Color, Scroll) {
	return {
		restrict: 'E',
		scope: {
			data: '='
		},
		link: function(scope, element, attrs) {
			var size = getSize('.container'),
				margin = { right: 0, bottom: 25, left: 30, top: 5 },
				width = size - margin.right - margin.left,
				height = size - margin.top - margin.bottom;

			function getSize(elem) {
				return parseInt(d3.select(elem).style("width"));
			};

			function drawGraph(data, xStyle, xDomain, yDomain) {

				if (d3.select('svg') !== undefined) {
					d3.select('svg').remove();
				}

				var svg = d3.select(element[0])
					.append('svg')
    				.attr('width', width + margin.right + margin.left)
    				.attr('height', height + margin.top + margin.bottom);

				var xMax = xDomain[0];
				var xMin = xDomain[xDomain.length-1];

				var x = d3.time.scale()
					.domain([xMin, xMax])
					.range([margin.left, width]);

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
						.attr("id", function(d) { return d.id; })
						.classed(line.replace(/[0-9]/g, ''), true)
						.on("click", function() {
							var id = d3.select(this).attr("id");
							Scroll.to( 'comment' + id );
						});
				};

			  function resize() {
					var container = getSize('.container'),
							width = container - margin.left - margin.right,
							height = container - margin.top - margin.bottom;

					var x = d3.time.scale()
						.domain([xMin, xMax])
						.range([margin.left, width]);

					var y = d3.scale.linear()
						.domain([d3.max(yDomain),d3.min(yDomain)])
						.range([margin.bottom, height+margin.top]);

					/* Update the range of the scale with new width/height */
			    x.range([0, width]).nice(d3.time.year);
			    y.range([height, 0]).nice();

			    /* Update the axis with the new scale */
			    svg.select('.x.axis')
						.attr("transform", "translate(0," + (height+margin.top) + ")")
						.call(xAxis);

			    svg.select('.y.axis')
						.attr("transform", "translate(" + (margin.left) + ", 0)")
						.call(yAxis);

			    /* Force D3 to recalculate and update the line */
console.log(data);
console.dir(data);
					for (var line in data) {
						console.log(line);
						svg.selectAll('circle')
							.data(data[line])
							.attr("cx", function(d) { return x(d.x); })
							.attr("cy", function(d) { return y(d.y); });
					}
			  };

			  d3.select(window).on('resize', resize);
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

					//avoids "Error: Failed to execute 'querySelectorAll'"
					sub = sub.replace(/[0-9]/g, '');

					d3.selectAll('circle.' + sub)
						.attr('fill', $rootScope.subColors[sub]);
				}

			});

		}
	}
}]);
