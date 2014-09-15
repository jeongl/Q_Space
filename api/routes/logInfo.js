var request        = require('request');
var cheerio        = require('cheerio');
var async          = require('async');
var DailySave      = require('./DailySave');
var moment         = require('moment');
var pool           = require('../../server.js').pool;


exports.logInfo = function(req, fn){

  console.log('req.headers: ', req.headers['user-agent']);

  var query = 'INSERT into logInfo' +
  '(Ip, Headers, Time, Date) values (?,?,?,?)'
  var date = new Date();

  var values = [req.ip, req.headers['user-agent'] , date.getHours() +' : '+ date.getMinutes(), moment().format('MMMM Do YYYY') ];

  pool.getConnection(function(err, connection) {
    connection.query('use Quotes', function(err, rows) {
        connection.query (query, values , function(err, rows) {
          if (err) throw err;
          else fn(rows);
        });
    });
    connection.release();
  });
}
