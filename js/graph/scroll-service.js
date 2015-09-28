app.service('Scroll', function($location, $anchorScroll) {
	
	this.to = function(id) {
		$location.hash("comment"+id);
		$anchorScroll();
		$location.hash();
	};
	
});