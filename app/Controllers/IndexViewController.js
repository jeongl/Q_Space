define(['Views/IndexView', 'Controllers/QuoteCollectionController'],
  function(IndexView, QuoteCollectionController) {
    
    function render() {
      console.log('this');
      IndexView.render();
      QuoteCollectionController.start(function(response) {
        console.log(response);
      });
    }

    return {
      start : render
    }

  });