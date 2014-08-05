var Quote = require('../models/Quote');
var moment = require('moment');
var pool = require('../../server.js').pool;

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
        var values = [ quotes[i].name, quotes[i].quote, moment().format('h:mm:ss a')  , moment().format("MMMM Do YYYY"), 0];
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


module.exports.findQuote = function(Date, fn) {

  var query = 'select * from users where Date=? ';
  var send = null;

  pool.getConnection(function(err, connection) {
    connection.query('use Quotes', function(err, rows) {
      if (err) throw err;
      connection.query(query, Date, function(err, rows, fields){
        if (err) throw err;
        else fn(rows);
      })
    })
    connection.release();
  });

}


module.exports.checkQuotess= function(todaysDate, yesterdaysDate,fn){
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

module.exports.checkQuotes = function(todaysDate, yesterdaysDate, fn) {
  exports.findQuote(todaysDate, function(rows) {
    if (rows.length > 0) {
      fn(rows);
    }
    else {
      fn('None_Found');
    }
  });
  
}













