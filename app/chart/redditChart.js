var app = angular.module('RedditUserComments', ['ngRoute']);

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
