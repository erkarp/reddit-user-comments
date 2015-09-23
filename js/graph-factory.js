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
		
		filterByUnit: function(dates, unit) {
			var uniqueDateUnits = [];
			dates.forEach(function(date) {
				for (var i = 0; i < uniqueDateUnits.length-1; i++) {
					if (date[unit] == uniqueDateUnits[i][unit]) {
						return; 
					} 
				}
				uniqueDateUnits.push(date);
			});
			return uniqueDateUnits.map(function(date) {
				return date.object;
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
		
		reduceX: function(data) {
			var dateParts = this.mapDateParts(data);
			var units = Object.keys(dateParts[0]);
			var unit, uniqueUnits = [];
			
			for (var i = 0; i<units.length-1 && uniqueUnits.length<5; i++) {
				unit = units[i];
				uniqueUnits = this.filterByUnit(dateParts, unit);
			}
			return [uniqueUnits, this.getFormat(unit)];
		}
	}
});