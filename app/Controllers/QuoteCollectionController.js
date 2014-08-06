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

    render.prototype = {
      attachEvents : function() {
        voteButton.Fns = new voteButton();
        voteButton.Fns.initialize();
      }
    }


  function voteButton () {

    var fn = {};

    fn.initialize = function() {
      this.attachUpVoteHandler();
    }

    fn.attachUpVoteHandler = function() {
      $('.VoteButton').on('click',function(e) {
        var voteNum = $(e.currentTarget).siblings();
        var saveObj = {
          num :  Number($(voteNum).filter('li.NumVotes').text()) + Number(1),
          name : $(voteNum).filter('#Name').text(),
          quote : $(voteNum).filter('#Quote').text()
        }
        console.log('saveObj: ', JSON.stringify(saveObj, null, 2));
        $(voteNum).filter('li.NumVotes').html( saveObj.num  );
      });      
    }

    fn.saveToDB = function() {

    }

    return fn
  }


  return {
    start: render
  }

});