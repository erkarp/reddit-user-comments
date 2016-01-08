app.directive('error', function () {
    return {
      restrict: 'E',
	    template: '<div class="alert alert-{{error}}">{{$parent.username}} {{message}}</div>',
      scope: {
        error: '=',
		    message: '@',
      },
      link: function (scope, element, attrs) {

    		function checkError() {
    			if (scope.error === 'danger') {
    			  return ' is not a reddit user. Please submit a valid username.';
    			} else if (scope.error === 'warning') {
    			  return ' hasn\'t submitted enough comments to graph!';
    			} else {
    			  return '';
    			}
    		}

    		scope.message = checkError();


    		scope.$watch(function() { return scope.error; }, function(value) {
    			if(!value) return;
    			scope.message = checkError();
    		});

      }
    };
  });
