var Quote = require('../models/Quote');
var moment = require('moment');

exports.Save = function(Comments, date){
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

exports.checkQuotes= function(todaysDate, yesterdaysDate,fn){
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