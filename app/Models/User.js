define (function() {
  function User(name){
    this.name = name || 'Default name'
  }

  User.prototype.logInfo = function(info, callback){
    reqwest({
      url: 'logInfo',
      method: 'post',
      data: info,
      success: function(resp){
      	if (callback) callback(resp);
      }
    });
  }

  return User;
});