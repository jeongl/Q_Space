define(['Views/QuoteCollectionView', 'Util/Spin', 'Models/SaveVote' ],function(QuoteCollectionView, Spin, SaveVote) {  

  ////
  ////  

  function render(fn) {

    var self = this;
    var target = document.getElementById('spin');
    var spinner = new Spin(null, target);

    QuoteCollectionView.render(spinner,{
      success: function(spinner) {
        spinner.stop();
        render.prototype.attachEvents.call(null);
        fn.call(null);
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
    var saveVote=null;

    fn.initialize = function() {
      this.attachUpVoteHandler();
    }

    fn.attachUpVoteHandler = function() {
      var self = this;
      $('.VoteButton').on('click',function(e) {
        var voteNum = $(e.currentTarget).siblings();
        var saveObj = {
          num :  Number($(voteNum).filter('li.NumVotes').text()) + Number(1),
          name : $(voteNum).filter('#Name').text(),
          quote : $(voteNum).filter('#Quote').text()
        }
        self.saveToDB(saveObj, {
          success: function(response) {
            $(voteNum).filter('li.NumVotes').html( saveObj.num  );
            // console.log('response after saving: ', response);
          },
          fail: function(response) {
            console.log('Failed response: ', response);
          }
        })
        
      });      
    }

    fn.saveToDB = function(saveObj, fn) {      
      saveVote = new SaveVote(saveObj);
      saveVote.save(function(response){
        if (response && response==='All done') {
          fn.success.call(null,'OK!'); 
        }
        else fn.fail.call(null,'Failed!');
      });
    }

    return fn
  }


  return {
    render: render
  }

});