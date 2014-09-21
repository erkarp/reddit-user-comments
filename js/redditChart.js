angular.module('MyApp', ['controllers', 'services', 'chartjs-directive']);

angular.module('services', [])
.factory('Comments', ['$http', function($http){
	return {
		get: function(user){
			return $http.get('http://www.reddit.com/user/' + user + '/comments/cjvkpaf.json?limit=100');
		},	
		dates: function(comments) {
			for (var i = 0; i < comments.length; i++) {
				comments[i].data.posted = this.dyMthYr(comments[i].data.created);
			} return comments;
		},	
		dyMthYr: function(created) {
			var timestamp = new Date(created * 1000);
			return timestamp.getDate() + "/" + timestamp.getMonth() + "/" + timestamp.getFullYear();
		}
	};
}])
.factory('PrepData', [function() {
	return {
		parse: function(comments) {
			var data = { labels: [], datasets: [] };
			for (var i=0; i<comments.length; i++) {
				var monthYear = this.monthYr(comments[i].data.created);
				if (i > 0) {
					data = this.addLine(data, comments[i].data.subreddit);
				}
				data = this.addDate(data, monthYear);
				var line = this.getLine(data, comments[i].data.subreddit);
				line[data.labels.indexOf(monthYear)]++;
			}
			return data;
		},	
		monthYr: function(created) {
			var timestamp = new Date(created * 1000);
			return timestamp.getMonth() + " " + timestamp.getFullYear();
		},
		addLine: function(data, subreddit) {
			if (this.getLine(data, subreddit) == -1) {
				data.datasets.push({ 
					label: subreddit, 
					data: [0]
				});
			} return data;
		},
		addDate: function(data, monthYear) {
			if (data.labels.indexOf(monthYear) == -1) {
				data.labels.push(monthYear);
				data.datasets.forEach(function(item){
					item.data.push(0);
				});
			} return data;
		}, 
		getLine: function(data, subreddit) {
			for (var i=0; i<data.datasets.length; i++) {
				if (data.datasets[i].label == subreddit) {
					return data.datasets[i].data;
				}
			} return -1;
		}
	};
}])
.factory('DrawChart', [function() {
	return {
		make: function(data){
			for (var i=0; i<data.datasets.length; i++) {
				var col = randomColor({ luminosity: 'bright', format: 'rgb' });
				data.datasets[i] = this.color(data.datasets[i], col);
			}	
			return data;
		},
		color: function(dataset, col) {
			dataset.fillColor = "rgba(0,0,0,0)";
			dataset.strokeColor = col;
			dataset.pointColor = col;
			dataset.pointStrokeColor = "#fff";
			dataset.pointHighlightFill = "#fff";
			dataset.pointHighlightStroke = col;
			return dataset;
		}
	};
}]);