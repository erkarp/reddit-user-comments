app.directive('comment', function () {
    return {
      restrict: 'A',
	  templateUrl: 'comment.html',
      scope: {
        commentData: '=info'
      },
      link: function (scope, element, attrs) {


        //Update when data changes
        scope.$watch(function() { return scope.errorClass; }, function(value) {
			if(!value) return;
        });
		  
      }
    };
  });