app.directive('comment', function () {
    return {
      restrict: 'A',
	  template: '<p><span style="background-color:{{commentData.color}}" class="subreddit"><a href="http://www.reddit.com/r/{{commentData.subreddit}}">{{commentData.subreddit}}:</a></span><a href="{{commentData.link_url}}">{{commentData.link_title}}</a><span class="date">{{commentData.posted}}</span></p><p>{{commentData.body}} <a class="perma" href="{{commentData.link_url+commentData.id}}">[link]</a></p>',
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