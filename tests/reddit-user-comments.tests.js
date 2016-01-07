describe('RedditUserComments', function() {

  beforeEach(module('RedditUserComments'));

  beforeEach(inject(function($injector) {
    Shuffle = $injector.get('Shuffle');
    Comments = $injector.get('Comments');
    Data = $injector.get('Data');
  }));


  it('Should report Shuffle return length and type', function() {
    var newArr = Shuffle.array([1, 2, 3, 4, 5]);
    expect(Shuffle.array([1, 2, 3, 4, 5])).toN
  });

  it('Should report that PrepData timestamp is a string', function() {
    var newDate = Data.monthYr(new Date);
    expect(typeof newDate).toEqual('string');
  });

});
