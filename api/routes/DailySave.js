var Quote = require('../models/Quote');
var moment = require('moment');

module.exports.Save = function(Comments, date){
  var quote = new Quote({
    Comments: Comments,
    Date:moment().format('MMMM Do YYYY'),
    Time:date.getHours() +' : '+ date.getMinutes()
  });

  quote.save(function(err, res){
    if (err) res.send('error');
//    else {console.log('res:', res)};
  });

}

module.exports.SaveQuoteSQL = function(pool, quotes) {

  var query = 'insert into users(Name, Quote, Time, Date, Votes) values (?,?,?,?,?)';
  var start = new Date().getTime();

  pool.getConnection(function(err, connection) {
    connection.query('use Quotes', function(err, rows) {
      for (var i in quotes ) {
        var values = [ quotes[i].name, quotes[i].quote, moment().format('h:mm:ss a')  , moment().format("MMM Do YY"), 0];
        connection.query (query, values , function(err) {
          if (err) throw err;
        })                        
      }
      connection.release();  
    });
  });

  var end = new Date().getTime();
  console.log('Time elapsed: ', end-start);

}

module.exports.checkQuotes= function(todaysDate, yesterdaysDate,fn){
  Quote.find({Date: todaysDate},function(err,res){
    if (res.length!==0){
      fn(res);
    }
    else {
      Quote.find({Date: yesterdaysDate}, function(err,res){
        if (res.length!==0){
          fn(res)
        }
        else{
          fn('None_Found!');
        }
      });
    }
  });
}