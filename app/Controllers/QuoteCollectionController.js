define(['Views/QuoteCollectionView', 'Util/Spin'],function(QuoteCollectionView, Spin) {

  function render(fn) {

    var target = document.getElementById('spin');
    var spinner = new Spin(null, target);

    QuoteCollectionView.render(spinner,{
      success: function(spinner) {
        spinner.stop();
        console.log('2');
        fn('done!');
      }
    });

  }

  function attachEvents() {

    $('.Vote').click(function() {
      console.log($(this).next().text());
    });

  }

  return {
    start: render
  }

});