app.directive('graph', function () {
	return {
		restrict: 'E',
		scope: {
			data: '='
		},
		link: function(scope, element, attrs) { 
			
			var graph = d3.select(element[0]);
			
			console.log('graphing...');
			
			graph.append('div').style({
				'width': '100%',
				'height': '500px',
				'border': '1px solid red',
			});
			
		}
	}
	
});