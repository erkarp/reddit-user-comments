app.directive('comment', ['$rootScope', function($rootScope) {
    return {
      restrict: 'A',
	    templateUrl: 'app/comments/comment.html',
      scope: {
        commentData: '=info'
      },
      link: function (scope, element, attrs) {

    			function setCommentLabelColors(color) {
    				scope.commentData.subColor = color;
    			};

          var converter = new showdown.Converter(),
              body = scope.commentData.body;
              
          scope.comment = converter.makeHtml(body);

    			scope.$watch(function() {
    				if ($rootScope.subColors[scope.commentData.subreddit]) {
    					return $rootScope.subColors[scope.commentData.subreddit];
    				}
    			},
    			function(value) {
    				setCommentLabelColors(value);
    			});
      }
    };
  }]);
