app.directive('error', function () {
    return {
      restrict: 'E',
	  transclude: true,
	  template: '<p>{{$parent.user}} {{message}}</p>',
      scope: {
        errorClass: '=error',
		message: '@',
      },
      link: function (scope, element, attrs) {
		  
		  console.dir(scope);
		  
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

        //Update when data changes
        scope.$watch(function() { return scope.errorClass; }, function(value) {
			if(!value) return;
			console.dir(scope);
			scope.message = checkError();
        });
		  
      }
    };
  });