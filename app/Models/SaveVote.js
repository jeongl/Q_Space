define(function() {

  function SaveVote(saveObj){
    this.Vote = saveObj || {};
  }

  SaveVote.prototype.fetch = function(callback){
    reqwest({
      url: 'saveVote',
      method: 'post',
      data: this.Vote,
      success: function(resp){
        callback(resp);
      }
    });
  }
  return SaveVote;
});