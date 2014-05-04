define(['Views/QuoteCollectionView', 'Util/Spin'],function(QuoteCollectionView, Spin) {

  function render() {

    var target = document.getElementById('spin');
    var spinner = new Spin(null, target);

    QuoteCollectionView.render(spinner,{
      success: function(spinner) {
        spinner.stop();
      }
    });

  };

  return {
    start: render
  }

});