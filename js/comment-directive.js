app.directive('comment', function () {
    return {
      restrict: 'A',
	  templateUrl: 'comment.html',
      scope: {
        colorData: '=color',
        commentData: '=info'
      },
      link: function (scope, element, attrs) {
		  
			function setCommentLabelColors() {
				for (var i = 0; i<scope.colorData.length; i++) {
					if (scope.colorData[i].label == scope.commentData.subreddit) {
						scope.commentData.subColor = scope.colorData[i].pointColor;
						break;
					}
				}
			};
		  	
		  	setCommentLabelColors();

			scope.$watch(function() { return scope.colorData[0].pointColor; }, function(value) {
				setCommentLabelColors();
			});
		  
    
      }
    };
  });