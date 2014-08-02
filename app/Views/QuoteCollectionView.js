define(['Models/QuoteCollection', 'hbs!assets/templates/quoteCollection', 'Util/fadeIn', 'jquery'],function(QuoteCollection, quoteTempl, FadeIn, $) {

  var quoteCollection = new QuoteCollection();

  function render(spin, callback){
    quoteCollection.fetch(function(response){
      var quotes = document.getElementById('Quotes');
      quotes.innerHTML = quoteTempl(response);
      console.log('quotes: ', $);
      FadeIn(quotes);

      render.prototype.success(spin, callback)
    });
  }

  render.prototype.success = function(spin, callback){
    callback.success(spin);
  }

  return {
    render:render
  }

});