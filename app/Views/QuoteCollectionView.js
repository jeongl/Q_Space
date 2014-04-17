define(['Models/QuoteCollection', 'hbs!assets/templates/quoteCollection'],function(QuoteCollection, quoteTempl) {

  var quoteCollection = new QuoteCollection();

  function render(){
    quoteCollection.fetch(function(response){
      var quotes = document.getElementById('Quotes');
      quotes.innerHTML = quoteTempl(response);
    });
  }


  return {
    render:render
  }

});