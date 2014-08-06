define(['Views/QuoteCollectionView', 'Util/Spin'],function(QuoteCollectionView, Spin) {

  var self = this;

  ////
  ////

  function render() {

    this.shit = 'hola';
    var target = document.getElementById('spin');
    var spinner = new Spin(null, target);

    QuoteCollectionView.render(spinner,{
      success: function(spinner) {
        spinner.stop();
      }
    }, this);

  }

  render.prototype = {

    attachEvents : function() {
      $('.1').click(function() {
        console.log($(this).next().text());
      });
    },

    test : function() {
      console.log('this: ', this);
      alert(this.shit);
    }

  }

  return {
    start: render
  }

});