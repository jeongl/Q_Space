define(['Models/QuoteCollection','Views/QuoteCollectionView'],function(QuoteCollection, QuoteCollectionView) {
    var quoteCollection = new QuoteCollection();

  function render() {
    QuoteCollectionView.render();
  };

  return {
    start: render
  }

});