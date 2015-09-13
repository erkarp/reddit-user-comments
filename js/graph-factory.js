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
			return subredditLines;
		}, 
		
		getXAxis: function(data) {
			var xAxis = {}; 
			var getDateMark = this.getDateMark;
			
			data.forEach(function(item) {
				var dateMark = getDateMark(item.data.created);
				
				if (xAxis[dateMark] == undefined) {
					xAxis[dateMark] = [];
				}
				xAxis[dateMark].push(item);
			});
			
			console.log(xAxis);
			return xAxis;
		}, 
		
		getDateMark: function(created) {
			var timestamp = new Date(created * 1000);
			var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			
			var month = months[timestamp.getMonth()];
			return month + " " + timestamp.getFullYear();
		}

	}
});