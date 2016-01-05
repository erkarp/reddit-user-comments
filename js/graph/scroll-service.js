app.service('Scroll', function($location, $anchorScroll) {

	this.to = function(id) {
		$location.hash("comment"+id);
		$anchorScroll();
		$location.hash();
	};

});


app.service('Color', function($rootScope) {
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	var color = [],  data = {}, cObj = {};
	color = color.concat(d3.scale.category10().range());
	color = color.concat(d3.scale.category20().range());
	color = color.concat(d3.scale.category20b().range());
	color = color.concat(d3.scale.category20c().range());
	color = color.slice(0,65);

	this.reddits = function(subs) {

		var count = getRandomInt(0, 60);
		subs == undefined ? subs = data : data = subs;

		for (var sub in subs) {
			cObj[sub] = color[count];
			count >= color.length ? count = 0 : count++;
		}

		$rootScope.subColors = cObj;
	};
});
