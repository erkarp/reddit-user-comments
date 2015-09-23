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
				case 'month': return "%b %y";
				case 'date': return "%x";
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
			var ticks = [];
			var keysMatch = this.keysMatch;
			
			dates.forEach(function(date) {
				for (var i = 0; i < ticks.length-1; i++) {
					if (keysMatch(date, ticks[i], units)) {
						return; 
					} 
				}
				ticks.push(date);
			});
			
			return ticks.map(function(date) {
				return date.object;
			});
		},
		
		reduceX: function(data) {
			var dateParts = this.mapDateParts(data);
			var units = Object.keys(dateParts[0]),
				uniqueUnits = [],
				pastUnits = [];
			
			for (var i = 0; i<units.length-1 && uniqueUnits.length<5; i++) {
				pastUnits.unshift(units[i]);
				uniqueUnits = this.filterByUnit(dateParts, pastUnits);
			}
			
			var format = this.getFormat(pastUnits[0]);
			return [uniqueUnits, format];
		}
	}
});