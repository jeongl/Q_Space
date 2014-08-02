var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();
var mongoose       = require('mongoose');
var scheduler      = require('./api/scheduler/DailyTasks');
var moment         = require('moment');

var mysql = require('mysql');
var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root'
});


pool.getConnection(function(err, connection) {
  // Use the connection
  connection.query( 'SELECT something FROM sometable', function(err, rows) {
    // And done with the connection.
    connection.release();

    // Don't use the connection here, it has been returned to the pool.
  });
});

pool.on('connection', function(){console.log('connected!!!!!!')});

// require('./api/makeDB/seedDB').DestroyCreateDBs(pool,{
// 	DropDBs : ['first','second', 'third', 'fourth', 'Forum', 'hmmm'],
// 	AddDBs : ['first','second', 'third', 'fourth', 'hmmm']
// });


require('./api/makeDB/seedDB').DestroyCreateDBs(pool,{
	DropDBs : (function() {
		var temp=[];
		for (var i=0; i<200; i++){
			temp.push('DB'+ i);
		}
		return temp
	}()),
	AddDBs : (function() {
		var temp =[];
		for (var i=0; i<0; i++){
			temp.push('DB' + i);
		}
		return temp
	}())
});


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

app.listen(3001);
console.log('Check port 3001');
