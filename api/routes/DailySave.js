var Quote = require('../models/Quote');

exports.Save= function(Comments, date){
  var quote = new Quote({
    Comments: Comments,
    Date:date,
    Time:date.getHours() +' : '+ date.getMinutes()
  });

  quote.save(function(err, res){
    if (err) res.send('error');
//    else {console.log('res:', res)};
  });

}