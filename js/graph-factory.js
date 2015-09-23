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
		
<<<<<<< Updated upstream
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
=======
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
			var units = Object.keys(dateParts[0]),
				uniqueUnits = [],
				pastUnits = [];
			
			for (var i = 0; i<units.length-1 && uniqueUnits.length<5; i++) {
				pastUnits.unshift(units[i]);
				uniqueUnits = this.filterByUnit(dateParts, pastUnits);
			}
			
			var format = this.getFormat(pastUnits[0]);
			return [uniqueUnits, format];
>>>>>>> Stashed changes
		}

	}
});