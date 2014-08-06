define(['Views/QuoteCollectionView', 'Util/Spin', 'hbs/handlebars'],function(QuoteCollectionView, Spin, Handlebars) {  

  ////
  ////

  function render() {

    var self = this;
    var target = document.getElementById('spin');
    var spinner = new Spin(null, target);

    QuoteCollectionView.render(spinner,{
      success: function(spinner) {
        spinner.stop();
        render.prototype.attachEvents.call(null);
      }
    });


  }


  function getAndUpdateVal (e) {
  }

  render.prototype = {
    attachEvents : function() {
      $('.VoteButton').on('click',function(e) {
        var voteNum = $(e.currentTarget).siblings('li.NumVotes');
        $(voteNum).html( Number($(voteNum).text()) + Number(1)  );
      });
    }
  }

  return {
    start: render
  }

});