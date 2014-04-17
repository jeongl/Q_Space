define(function() {

  function Quote(text){
    this.Quote = text || 'lots of marbles; not one glass';
  }

  Quote.prototype.test = function(){
    reqwest({
      url: 'route',
      method: 'post',
      data: {foo:'bar'}
    });
  }
  return Quote;
});