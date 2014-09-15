define(['Views/IndexView', 'Controllers/QuoteCollectionController', 'Models/User'],
  function(IndexView, QuoteCollectionController, User) {
    
    function render() {
      console.log('IndexViewController');
      User.prototype.logInfo();
      IndexView.render();
      QuoteCollectionController.render();
    }

    return {
      start : render
    }

  });