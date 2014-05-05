var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();
var mongoose       = require('mongoose');
var scheduler = require('./api/scheduler/DailyTasks');

app.use(express.static(__dirname));
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser()); 						// pull information from html in POST
app.use(methodOverride()); 					// simulate DELETE and PUT


if ('development' === process.env.NODE_ENV || undefined === process.env.NODE_ENV){
  console.log('process.env.NODE_ENV =', process.env.NODE_ENV);
  mongoose.connect('mongodb://localhost/quoteSpace-development');
  scheduler();
}


var quotes = require('./api/routes/quoteRoutes');

app.get('/getQuotes', quotes.getQuotes);


app.listen(3001);
console.log('Check port 3001');
