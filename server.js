var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();

app.use(express.static(__dirname));
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser()); 						// pull information from html in POST
app.use(methodOverride()); 					// simulate DELETE and PUT

app.get('/getQuotes', function(req,res){
  var quotes = [
      {
        "Person" : "Thomas Edison",
        "Quote" : "You can't always get what you want!"
      },
      {
        "Person" : 'Unknown',
        "Quote" : "Life is good"
      }
  ];
  res.send(quotes);
})


app.listen(3001);
console.log('Check port 3001');