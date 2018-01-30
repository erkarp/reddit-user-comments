var app = angular.module('RedditUserComments', ['ngRoute', 'ngSanitize']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/:param', {
          templateUrl: 'templates/main.html',
          controller: 'MainCtrl'
      })
      .otherwise({
          redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
});

app.controller('CloudController', ['$scope', '$rootScope', '$location', 'Comments', 'Color', 'Scroll',
function($scope, $rootScope, $location, Comments, Color, Scroll){

	$scope.createChart = function(user) {
		if (user == undefined) {
			user = $scope.username;
		}

		$scope.username = user;
		$scope.setSub = 'all';
		$scope.comments = false;
		$scope.error = false;
		$rootScope.subColors = [];

		Comments.async(user)
		.then(function(result) {

			if (result[11] == undefined) {
				$scope.error = 'warning';
				return;
			}
			$scope.error = false;
	    $scope.comments = result;
	    $scope.data = Comments.analyze(result);

			var ref = $location.url();
			$location.url('/' + user);
		},
    function (red) {
			$scope.error = 'danger';
    });
	};


	if ($location.url().length > 1) {

		if ($location.url().indexOf("#") > -1) {
			var i = $location.url().indexOf("#");
			$location.url($location.url().slice(1,i));
		}

		$scope.username = $location.url().slice(1);
		$scope.createChart($scope.username);
	}

	$scope.scroll = function() {
		Scroll.to('main');
	}

	$scope.color = function() {
		Color.reddits();
	};

}]);

app.directive('error', function () {
    return {
      restrict: 'E',
	    template: '<div class="alert alert-{{error}}"><i class="fa fa-exclamation-circle"></i><p>{{$parent.username}} {{message}}</p></div>',
      scope: {
        error: '=',
		    message: '@',
      },
      link: function (scope, element, attrs) {

    		function checkError() {
    			if (scope.error === 'danger') {
    			  return ' is not a reddit user. Please submit a valid username.';
    			} else if (scope.error === 'warning') {
    			  return ' hasn\'t submitted enough comments to graph!';
    			} else {
    			  return '';
    			}
    		}

    		scope.message = checkError();


    		scope.$watch(function() { return scope.error; }, function(value) {
    			if(!value) return;
    			scope.message = checkError();
    		});

      }
    };
  });

app.directive('comment', ['$rootScope', function($rootScope) {
    return {
      restrict: 'A',
	    templateUrl: 'templates/comment.html',
      scope: {
        commentData: '=info'
      },
      link: function (scope, element, attrs) {

    			function setCommentLabelColors(color) {
    				scope.commentData.subColor = color;
    			};

          var converter = new showdown.Converter(),
              body = scope.commentData.body;
          scope.comment = converter.makeHtml(body);

    			scope.$watch(function() {
    				if ($rootScope.subColors[scope.commentData.subreddit]) {
    					return $rootScope.subColors[scope.commentData.subreddit];
    				}
    			},
    			function(value) {
    				setCommentLabelColors(value);
    			});

      }
    };
  }]);

app.service('Comments', function($http, Data) {
  return {
    async: function(user) {
  	   var promise = $http.get('http://www.reddit.com/user/' + user + '/comments.json?limit=100')

  	  .then(function (response) {
  		    return response.data.data.children;
      });

      return promise;
    },

    analyze: function(data) {
      return Data.parse(data);
    }
  };
});

app.filter('subChoice', function () {

  return function (input, chosenSub) {

	if (chosenSub == 'all') { return input; }

    var out = [];
    angular.forEach(input, function(comment){
      if(comment.data.subreddit === chosenSub){
        out.push(comment);
      }
    });

    return out;
  }

});

app.directive('sub', function ($rootScope) {
    return {
      restrict: 'A',
      scope: {
		  	subData: '=info'
      },
	  template: '{{subData.label}} ({{subData.total}})',
      link: function (scope, element, attrs) {

      //  attrs.$set('style', 'background-color:' + $rootScope.subColors[scope.subData.label]);

      		scope.$watch(function() { 
      			if ($rootScope.subColors != undefined){
      				return $rootScope.subColors[scope.subData.label];
      			}
      		}, function(value) {
      			attrs.$set('style', 'background-color:' + value);
      		});

      		scope.$watch(function() { return $rootScope.chosenSub }, function(value) {
      			scope.subData.label == value || value == 'all'
      				? element.addClass('active')
      				: element.removeClass('active');
      		});

      }
    };
  });

app.controller('MainCtrl', ['$rootScope', '$scope', 'Data', 'Color',
function($rootScope, $scope, Data, Color) {

  $scope.setSub = function(sub) {

		$rootScope.chosenSub = sub;
    Color.ripple(sub);
    
	};

  $scope.setSub('all');

}]);

app.factory('Data', [function() {
	return {
		parse: function(comments) {
			var data = {
				labels: [],
				datasets: []
			};

			for (var i=0; i<comments.length; i++) {

				var monthYear = this.monthYr(comments[i].data.created);
				if (i > 0) {
					data = this.addLine(data, comments[i].data.subreddit, false);
				}

				data = this.addDate(data, monthYear);
				var temp = this.getLine(data, comments[i].data.subreddit);
				temp[data.labels.indexOf(monthYear)]++;
			}
			return data;
		},

		monthYr: function(created) {
			var timestamp = new Date(created * 1000);
			return timestamp.getMonth() + " " + timestamp.getFullYear();
		},

		addLine: function(data, subreddit) {
	//		subreddit = subreddit.replace(/[0-9]/g, '');
			if (this.getLine(data, subreddit, true) == -1) {
				data.datasets.push({
					label: subreddit,
					data: [0],
					total: 0
				});
			}
			return data;
		},

		addDate: function(data, monthYear) {
			if (data.labels.indexOf(monthYear) == -1) {
				data.labels.push(monthYear);

				data.datasets.forEach(function(item){
					item.data.push(0);
				});
			}
			return data;
		},

		getLine: function(data, subreddit, fromAddLine) {
			for (var i=0; i<data.datasets.length; i++) {
				if (data.datasets[i].label == subreddit) {
					if (! fromAddLine) {
						data.datasets[i].total++;
					}
					return data.datasets[i].data;
				}
			}
			return -1;
		}
	};
}]);

app.directive('graph', ['$rootScope', 'Graph', 'Color', 'Scroll', function ($rootScope, Graph, Color, Scroll) {
	return {
		restrict: 'E',
		scope: {
			data: '='
		},
		link: function(scope, element, attrs) {
			var size = getWidth('.container'),
				margin = { right: 0, bottom: 25, left: 30, top: 5 },
				width = size - margin.right - margin.left,
				height = 500 - margin.top - margin.bottom;

			function getWidth(elem) {
				return parseInt(d3.select(elem).style("width"));
			};

			function drawGraph(data, xStyle, xDomain, yDomain) {

				if (d3.select('svg') !== undefined) {
						d3.select('svg').remove();
				}

				var svg = d3.select(element[0]).append('svg')
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
						.attr("id", function(d) { return d.id; })
						.classed(line.replace(/[0-9]/g, ''), true)
						.on("click", function() {
							var id = d3.select(this).attr("id");
							Scroll.to( 'comment' + id );
						});
					}

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

					for (var line in data)
					{
						svg.selectAll('circle.' + line)
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
}
]);

app.factory('Graph', ['xAxis', function(xAxis) {
	return {
		getSubLines: function(data) {
			var subredditLines = {};

			data.forEach(function(item) {
				var subreddit = item.data.subreddit;

				if (subredditLines[subreddit] == undefined) {
					subredditLines[subreddit] = [];
				}
				subredditLines[subreddit].push({
					x: new Date(item.data.created * 1000),
					y: item.data.score,
					id: item.data.id,
					ups: item.data.ups,
					downs: item.data.downs
				});
			});
			return subredditLines;
		},

		getYAxis: function(data) {
			return data.map(function(item) {
				return item.data.score;
			}, []);
		},

		getXAxis: function(data) {
			var allDates = data.map(function(item) {
				return new Date(item.data.created * 1000);
			}, []);

			return xAxis.reduceX(allDates);
		}
	}
}]);

app.factory('xAxis', function() {
	return {
		mapDateParts: function(data) {
			return data.map(function(item) {
				return {
					year: item.getFullYear(),
					month: item.getMonth(),
					date: item.getDate(),
					time: item.getTime(),
					object: item
				}
			});
		},

		getFormat: function(unit) {
			switch (unit) {
				case 'year': return "%Y";
				case 'month': return "%b '%y";
				case 'date': return "%b %e, '%y";
				case 'time': return "%h:%M %p, %x";
				default: return "%b %y";
			};
		},

		keysMatch: function(obj1, obj2, keys) {
			return keys.every(function(key) {
				return obj1[key] == obj2[key];
			});
		},

		filterByUnit: function(dates, units) {
			var keysMatch = this.keysMatch,
				ticks = [];

			dates.forEach(function(date) {
				var redundantDate = ticks.some(function(tick) {
					return keysMatch(date, tick, units);
				});

				if (! redundantDate) { ticks.push(date); }
			});

			return ticks.map(function(date) {
				return date.object;
			});
		},

		reduceX: function(data) {
			var dateMaps = this.mapDateParts(data);
			var units = Object.keys(dateMaps[0]),
				uniqueUnits = [],
				pastUnits = [];

			for (var i = 0; i<units.length-1 && uniqueUnits.length<5; i++) {
				pastUnits.unshift(units[i]);
				uniqueUnits = this.filterByUnit(dateMaps, pastUnits);
			}

			uniqueUnits.push(dateMaps[dateMaps.length-1].object);
			uniqueUnits.unshift(dateMaps[0].object);

			var format = this.getFormat(pastUnits[0]);
			return {
				array: uniqueUnits,
				style: format
			};
		}
	}
});

app.service('Scroll', function($location, $anchorScroll) {

	$anchorScroll.yOffset = function() {
		return 50;
	}

	this.to = function(id) {
		$location.hash(id);
		$anchorScroll();
		$location.hash('');
	};

});


app.service('Color', function($rootScope, Shuffle) {

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	var color = [],  data = {}, cObj = {};
	color = color.concat(d3.scale.category10().range());
	color = color.concat(d3.scale.category20().range());
	color = color.concat(d3.scale.category20b().range());
	color = color.concat(d3.scale.category20c().range());
	color = Shuffle.array(color.slice(0,65));

	this.reddits = function(subs) {

		var count = getRandomInt(0, 60);
		subs == undefined ? subs = data : data = subs;

		for (var sub in subs) {
			cObj[sub] = color[count];
			count >= color.length ? count = 0 : count++;
		}

		$rootScope.subColors = cObj;
	};

	this.ripple = function(sub) {

		if (sub === 'all') {

			d3.selectAll('circle')
				.transition()
				.attr('r', 3)
				.duration(400);

		} else {
			var color = $rootScope.subColors[sub],
					sub = sub.replace(/[0-9]/g, '');

			d3.selectAll('circle')
				.attr('r', 0);

			d3.selectAll('circle.' + sub)
				.attr('r', 35)
				.attr('fill', '#fff')
				.attr('fill-opacity', 0)
				.attr('stroke', color)
				.attr('stroke-width', 2)
				.attr('stroke-opacity', .1)
				.style('display', 'block')
				.transition()
				.attr('r', 2)
				.duration(1000)
				.attr('fill', color)
				.attr('stroke-opacity', 1);

			d3.selectAll('circle.' + sub)
				.transition()
				.delay(900)
				.attr('stroke-width', 0)
				.attr('fill-opacity', 100)
				.attr('r', 3);
		}
	};

});

app.service('Shuffle', function () {
	return {
		array: function(array) {
		  var m = array.length, t, i;

		  while(m) {
		    i = Math.floor(Math.random() * m--);
		    t = array[m];
		    array[m] = array[i];
		    array[i] = t;
		  }

		  return array;
		}
	}
})
