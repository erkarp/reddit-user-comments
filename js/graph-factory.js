app.factory('Graph', function() {
	return {
		getSubLines: function(data) {
			var subredditLines = {};
			
			data.forEach(function(item) {
				var subreddit = item.data.subreddit;
				
				if (subredditLines[subreddit] == undefined) {
					subredditLines[subreddit] = [];
				}
				subredditLines[subreddit].push(item);
			});
			console.log(subredditLines);
			
			return this.arrayOfKeys(subredditLines);
		}, 
		
		arrayOfKeys: function(obj) {
			var array = [];
				
			for (var key in obj) {
				array.push(obj[key].length);
			}
			return array;
		},
		
		getXAxis: function(data) {
			var format = d3.time.format("%b %y");
			var xAxis = []; 
			
			data.forEach(function(item) {
				var dateMark = format(new Date(item.data.created * 1000));
				if (xAxis.indexOf(dateMark) == -1) { xAxis.push(dateMark); }
			});
			return xAxis;
		}

	}
});