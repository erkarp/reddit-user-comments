app.filter('subChoice', function () {

  return function (input, chosenSub) {

	if (chosenSub == 'all') { return input; }

    var out = [];
    angular.forEach(input, function(comment){
      if(comment.data.subreddit === chosenSub){
        out.push(comment);
      }
    });

    return out;
  }

});
