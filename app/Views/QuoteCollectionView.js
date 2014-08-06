define(['Models/QuoteCollection', 'hbs!assets/templates/quoteCollection', 'Util/fadeIn', 'jquery', 'hbs/handlebars'],function(QuoteCollection, quoteTempl, FadeIn, $, Handlebars) {

  var quoteCollection = new QuoteCollection();
  var self = this;

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
    callback.success.call(null,spin);
  }

  return {
    render:render
  }

});