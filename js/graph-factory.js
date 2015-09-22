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
		
		reduceX: function(array) {
			var reduced, format, unitFn, count = 0; 
			do {
				switch (count) {
					case 0: 
						format = "%Y";
						unitFn = getFullYear(); 
						break;
					case 1: 
						format = "%b %y"; 
						unitFn = getMonth();
						break;
					case 2: 	
						format = "%x";
						unitFn = getDate();
						break;
					case 3: 
						format = "%h:%M %p, %x";
						unitFn = getHour();
						break;
				};
				reduced = this.reduceXAxis(array, unitFn);
				count++;
				
			} while (reduced.length < 2);
			
			return [reduced, format];
		},
		
		reduceXAxis: function(array, timeFn) {
			var newArr = [];
			
			for (var i = 0; i++; i<array.length-1) {
				var mockTick = timeFn(array[i]);
				
				if (! newArr.includes(mockTick)) {
					newArr.push(mockTick); 
				}
			}
			return newArr;
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