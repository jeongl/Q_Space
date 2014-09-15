var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();
var mongoose       = require('mongoose');
var scheduler      = require('./api/scheduler/DailyTasks');
var moment         = require('moment');
var seedDB         = require('./api/makeDB/seedDB');

var mysql = require('mysql');
var pool  = module.exports.pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root'
});


pool.on('connection', function(){console.log('connected!!!!!!')});

seedDB.DestroyCreateDBs(pool,{
  //The source of the undefined errors are that these two options have to be called separately upon running
  //the program. IDK what the source of the error is. It might be better just to rewrite the Create/Delete seed program.
	// DropDBs : ['Quotes']
	AddDBs : ['Quotes']
});

seedDB.SetupQuotesTable(pool);


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



app.get('/getQuotes', function(req, res){
  quotes.checkQuotes(function(response){
    console.log('response === ', response);
  },'development', res);
});

app.post('/saveVote', function(req, res){
  quotes.updateVote(req.body, function(response){
    if (response) res.send('All done');
    else res.send('Failed');
  });  
});

app.get('/saveVote', function(req, res){
  quotes.getVotes(req.query, function(response){
    if (response) res.send(response);
    else res.send('Failed');
  });
});



app.listen(3001);
console.log('Check port 3001');
