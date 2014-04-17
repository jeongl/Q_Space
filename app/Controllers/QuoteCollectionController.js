define(['Models/QuoteCollection',
  'Views/QuoteCollectionView'],function(QuoteCollection, QuoteCollectionView) {
    var quoteCollection = new QuoteCollection();

  function start() {
    quoteCollection.fetch(function(response){
      QuoteCollectionView(response);
      require(['hbs!assets/templates/One'], function ( tmplOne ) {
        var quotes = document.getElementById('Quotes');
        quotes.innerHTML= tmplOne(response);
      });
    });

  }


  return {
    start : start
  }

});