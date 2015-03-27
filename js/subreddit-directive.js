app.directive('sub', function () {
    return {
      restrict: 'A',
	  template: '<span style="background-color:{{subData.pointColor}}"><a href="{{link}}">{{subData.label}} ({{subData.total}})</a></span>',
      scope: {
        subData: '=info'
      },
      link: function (scope, element, attrs) {
          
      }
    };
  });