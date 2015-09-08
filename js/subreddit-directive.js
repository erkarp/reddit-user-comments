app.directive('sub', function ($rootScope) {
    return {
      restrict: 'A',
      scope: {
        subData: '=info'
      },
	  template: '{{subData.label}} ({{subData.total}})',
      link: function (scope, element, attrs) {
        
        attrs.$set('style', 'background-color:' + scope.subData.pointColor);
        
		scope.$watch(function() { return scope.subData.pointColor; }, function(value) {
			attrs.$set('style', 'background-color:' + scope.subData.pointColor);
		});
		  
		scope.$watch(function() { return $rootScope.chosenSub }, function(value) {
			console.log(scope.subData.label, value);
			if (scope.subData.label == value || value == 'all') {
				console.log('YAAS');
				element.addClass('active');
			} else {
				console.log('NERP');
				element.removeClass('active');
			}
		});
        
      }
    };  
  });