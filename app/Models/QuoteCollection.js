define(function() {

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
        callback(resp);
      }
    });
  }
  return QuoteCollection;
});