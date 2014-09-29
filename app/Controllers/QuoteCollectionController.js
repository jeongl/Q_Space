define(['Views/QuoteCollectionView', 'Util/Spin', 'Models/SaveVote' ],function(QuoteCollectionView, Spin, SaveVote) {  

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
    var saveVote=null;

    fn.initialize = function() {
      this.attachUpVoteHandler();
    }

    fn.attachUpVoteHandler = function() {
      var self = this;
      $('.VoteButton').on('click', function(e) {
        window.el = $(e.currentTarget).parentsUntil('.col-xs-8').eq(2);   
        var id = el.parent().find('.VoteIcons').find('button').attr('id');
        var voteNum = $(el).find('.NumVotes').html();
        var offset = /VoteButton Up/.test( $(e.currentTarget)[0].className) ? 1:-1;
        console.log('el: ', el);
        var saveObj = {
          id : id,
          num :  Number(voteNum) + Number(offset),
          quote : $(el).parent().find('#Quote').html().split(' <span>')[0]
        }
        self.saveToDB(saveObj, {
          success: function(response) {
            $(el).find('.NumVotes').html( saveObj.num  );
            // console.log('response after saving: ', response);a
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