define(['Two'],function(Two) {

  function QuoteCollection(quotes){
    this.Quote = quotes || {};
  }

  QuoteCollection.prototype.fetch = function(callback){
    reqwest({
      url: 'getQuotes',
      method: 'get',
      success: function(resp){
        this.quote = resp;
//        console.log(JSON.stringify(resp, null, 2));
        for (var i=0; i<10; i++){
          var random = Math.floor(Math.random()*resp.length+1)
          console.log(JSON.stringify(resp[random], null, 2));
        }
        callback(resp);
      }
    });
  }
  return QuoteCollection;
});