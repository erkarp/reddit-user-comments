app.factory('Graph', function() {
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
					y: item.data.score
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
			return data.map(function(item) {
				return new Date(item.data.created * 1000);
			}, []);
		},
							
		getXAxis2: function(data) {
			var xAxis = []; 
			var format = this.format;
			
			data.forEach(function(item) {
				var dateMark = format(item.data.created);
				if (xAxis.indexOf(dateMark) == -1) { 
					xAxis.push(dateMark); 
				}
			});
			return xAxis;
		}, 
		
		format: function(date) {
			var format = d3.time.format("%b %y");
			return format(new Date(date * 1000));
		}

	}
});