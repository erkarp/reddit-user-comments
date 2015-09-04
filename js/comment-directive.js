app.directive('comment', function () {
    return {
      restrict: 'A',
	  templateUrl: 'comment.html',
      scope: {
        colorData: '=color',
        commentData: '=info'
      },
      link: function (scope, element, attrs) {
		var color = ''; 

		for (var i = 0; i<scope.colorData.length; i++) {
			if (scope.colorData[i].label == scope.commentData.subreddit) {
				element.css({
					backgroundColor:  scope.colorData[i].pointColor
				}); 
				break;
			}
		}
    
      }
    };
  });