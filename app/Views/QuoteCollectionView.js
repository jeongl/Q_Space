define(['Models/QuoteCollection', 'hbs!assets/templates/quoteCollection', 'Util/fadeIn', 'jquery', 'hbs/handlebars'],function(QuoteCollection, quoteTempl, FadeIn, $, Handlebars) {

  var quoteCollection = new QuoteCollection();
  var self = this;

  function render(spin, callback){
    quoteCollection.fetch(function(response){

      //Capitalize Names in response
      for (var i=0; i<response.length; i++){
        var result = '';
        response[i].Name.split('_').forEach(function(item){
          result+= item.charAt(0).toUpperCase() + item.slice(1) + ' ' ;
        }) ;
        response[i].Name = result;
      }

      console.log('response: ', response);
      var quotes = document.getElementById('Quotes');
      quotes.innerHTML = quoteTempl(response);
      FadeIn(quotes);

      callback.success.call(null, spin);

    });
  }

  return {
    render:render
  }

});