app.directive('sub', function () {
    return {
      restrict: 'A',
	  template: '{{subData.label}} ({{subData.total}})',
      scope: {
        subData: '=info'
      },
      link: function (scope, element, attrs) {
        
        attrs.$set('style', 'background-color:' + scope.subData.pointColor);
        
      }
    };  
  });