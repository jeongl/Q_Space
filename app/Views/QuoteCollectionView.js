define(['Models/QuoteCollection', 'hbs!assets/templates/quoteCollection', 'Util/fadeIn', 'jquery'],function(QuoteCollection, quoteTempl, FadeIn, $) {

  var quoteCollection = new QuoteCollection();

  function render(spin, callback){
    quoteCollection.fetch(function(response){
      console.log('response: ', response);
      var quotes = document.getElementById('Quotes');
      quotes.innerHTML = quoteTempl(response);
      FadeIn(quotes);

      render.prototype.success(spin, callback)
    });
  }

  render.prototype.success = function(spin, callback){
    callback.success.call(this,spin);
    console.log('1');
  }

  return {
    render:render
  }

});