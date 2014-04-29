define(['Views/IndexView', 'Controllers/QuoteCollectionController'],
    function(IndexView, QuoteCollectionController) {

      function render() {
        console.log('this');
        IndexView.render();
        QuoteCollectionController.start();
      }

      return {
        start : render
      }
    });