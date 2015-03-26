app.directive('error', function () {
    return {
      restrict: 'E',
      scope: {
        errorClass: '=ng-hide',
		badUser: '='
      },
      link: function (scope, element, attrs) {
		  
		  if (scope.errorClass === 'red') {
			  var message: scope.badUser+'is not a reddit user. Please submit a valid username.';
		  } else if (scope.errorClass === 'orange') {
			  var message: scope.badUser+'hasn\'t submitted enough comments to graph!';
		  }
		  
      }
    };
  });