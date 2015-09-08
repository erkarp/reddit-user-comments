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
			scope.subData.label == value || value == 'all' 
				? element.addClass('active')
				: element.removeClass('active');
		});
        
      }
    };  
  });