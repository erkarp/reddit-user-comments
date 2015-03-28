app.directive('comment', function () {
    return {
      restrict: 'A',
	  templateUrl: 'comment.html',
      scope: {
        commentData: '=info'
      }
    };
  });