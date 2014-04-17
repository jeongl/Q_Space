define(['Models/QuoteCollection',
  'Views/QuoteCollectionView',
  'hbs!assets/templates/One'],function(QuoteCollection, QuoteCollectionView, quoteTempl) {
    var quoteCollection = new QuoteCollection();

  function render() {
    quoteCollection.fetch(function(response){
      QuoteCollectionView(response);
      var quotes = document.getElementById('Quotes');
      quotes.innerHTML= quoteTempl(response);
    });
  }

  return {
    render : render
  }

});