app.factory('Graph', ['xAxis', function(xAxis) {
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
			var allDates = data.map(function(item) {
				return new Date(item.data.created * 1000);
			}, []);
			
			return xAxis.reduceX(allDates);
		}
	}
}]);
		
app.factory('xAxis', function() {
	return {
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
				case 'month': return "%b '%y";
				case 'date': return "%b %e, '%y";
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
			var keysMatch = this.keysMatch,
				ticks = [];
			
			dates.forEach(function(date) {
				var redundantDate = ticks.some(function(tick) {
					return keysMatch(date, tick, units);
				});
				
				if (! redundantDate) { ticks.push(date); }
			});
			
			return ticks.map(function(date) {
				return date.object;
			});
		},
		
		reduceX: function(data) {
			var dateMaps = this.mapDateParts(data);
			var units = Object.keys(dateMaps[0]),
				uniqueUnits = [],
				pastUnits = [];
			
			for (var i = 0; i<units.length-1 && uniqueUnits.length<5; i++) {
				pastUnits.unshift(units[i]);
				uniqueUnits = this.filterByUnit(dateMaps, pastUnits);
			}
			
			uniqueUnits.push(dateMaps[dateMaps.length-1].object);
			uniqueUnits.unshift(dateMaps[0].object);
			
			var format = this.getFormat(pastUnits[0]);
			return {
				array: uniqueUnits, 
				style: format
			};
		}
	}
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
	
	this.reddits = function(subs) {
		
		var count = getRandomInt(0, 60);
		subs == undefined ? subs = data : data = subs;
		
		for (var sub in subs) {
			cObj[sub] = color[count];
			count++;
		}
		
		$rootScope.subColors = cObj;
	};
});