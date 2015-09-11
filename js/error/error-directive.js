app.directive('error', function () {
    return {
      restrict: 'E',
	  template: '<p>{{$parent.user}} {{message}}</p>',
      scope: {
        errorClass: '=error',
		message: '@',
      },
      link: function (scope, element, attrs) {
		  
		function checkError() {
			if (scope.errorClass === 'red') {
			  return ' is not a reddit user. Please submit a valid username.';
			} else if (scope.errorClass === 'orange') {
			  return ' hasn\'t submitted enough comments to graph!';
			} else {
			  return ''; 
			}  
		}

		scope.message = checkError();

		  
		scope.$watch(function() { return scope.errorClass; }, function(value) {
			if(!value) return;
			scope.message = checkError();
		});

      }
    };
  });