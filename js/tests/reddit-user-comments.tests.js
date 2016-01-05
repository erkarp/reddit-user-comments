describe('RedditUserComments.Shuffle', function() {

  var FibonacciService;

  beforeEach(module('RedditUserComments'));
  beforeEach(inject(function($injector) {
    Shuffle = $injector.get('Shuffle');
  }));

  it('Should report array length', function() {
    expect([1, 2, 3].length).toEqual(3);
  });

  it('Should return "object"', function() {
    expect(typeof [0]).toMatch('object');
  })

});
