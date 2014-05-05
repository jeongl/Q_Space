var Quote = require('../models/Quote');

exports.Save= function(Comments){
  var quote = new Quote(Comments);
  quote.save(function(err, res){
    if (err) res.send('error');
    else {console.log(JSON.stringify(Comments,null,2))};
  });
}