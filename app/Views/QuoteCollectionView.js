define(['Models/QuoteCollection', 'hbs!assets/templates/quoteCollection', 'Util/fadeIn', 'jquery'],function(QuoteCollection, quoteTempl, FadeIn, $) {

  var quoteCollection = new QuoteCollection();

  function render(spin, callback, Fn){
    quoteCollection.fetch(function(response){
      console.log('response: ', response);
      var quotes = document.getElementById('Quotes');
      quotes.innerHTML = quoteTempl(response);
      FadeIn(quotes);

      render.prototype.success(spin, callback, Fn)
    });
  }

  render.prototype.success = function(spin, callback, Fn){
    callback.success.call(null,spin);
    Fn.start.prototype.test.call(Fn);
  }

  return {
    render:render
  }

});