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
        callback(resp);
      }
    });
  }
  return QuoteCollection;
});