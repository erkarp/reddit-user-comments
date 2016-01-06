app.directive('sub', function ($rootScope) {
    return {
      restrict: 'A',
      scope: {
		  	subData: '=info'
      },
	  template: '{{subData.label}} ({{subData.total}})',
      link: function (scope, element, attrs) {

      //  attrs.$set('style', 'background-color:' + $rootScope.subColors[scope.subData.label]);

      		scope.$watch(function() { 
      			if ($rootScope.subColors != undefined){
      				return $rootScope.subColors[scope.subData.label];
      			}
      		}, function(value) {
      			attrs.$set('style', 'background-color:' + value);
      		});

      		scope.$watch(function() { return $rootScope.chosenSub }, function(value) {
      			scope.subData.label == value || value == 'all'
      				? element.addClass('active')
      				: element.removeClass('active');
      		});

      }
    };
  });
