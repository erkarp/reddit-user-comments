app.service('Scroll', function($location, $anchorScroll) {

	this.to = function(id) {
		$location.hash("comment"+id);
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
		var color = $rootScope.subColors[sub];

		d3.selectAll('circle.' + sub)
			.attr('r', 15)
			.attr('fill', '#fff')
			.attr('fill-opacity', 0)
			.attr('stroke', color)
			.attr('stroke-width', 2)
			.style('display', 'block')
			.transition()
			.attr('r', 2)
			.duration(800)
			.attr('fill', color);

		d3.selectAll('circle.' + sub)
			.transition()
			.delay(800)
			.attr('stroke-width', 0)
			.attr('fill-opacity', 100)
			.attr('r', 3);
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
