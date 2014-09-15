var request        = require('request');
var cheerio        = require('cheerio');
var async          = require('async');
var DailySave      = require('./DailySave');
var moment         = require('moment');
var pool           = require('../../server.js').pool;

exports.checkQuotes = function(fn,env,res){
  var todaysDate = moment().format('MMMM Do YYYY');
  var yesterdaysDate = moment().subtract('days', 1).format('MMMM Do YYYY');

  DailySave.checkQuotes(todaysDate,yesterdaysDate, function(response){
    if (response === 'None_Found!'){
      console.log('none_found!');
      if ('development' === env){
        exports.getQuotes(null,res);
        fn('scraping');
      }
    }
    else{
      console.log('response!', JSON.stringify(response, null, 2));
      fn('existing');
      //Send back to client here.
      res.send(response);
    }
  });
}

exports.updateVote = function(req, fn){

  var query = 'UPDATE users SET Votes=?' +
  'where Name = ? and Quote = ?'

  var values = [req.num, req.name, req.quote];

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

exports.getVotes = function(req, fn){

  var query = 'select * from users ' +
  'where id between ? and ?'

  var values = [String(req.first), String(req.last)];

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


exports.getQuotes = function(req,res){
  var temp=[];
  var date = new Date();

  request('http://www.brainyquote.com/quotes/favorites', function(err, response, body){
    var $ = cheerio.load(body);
    $('div.bq_s a').map(function(index, el){
      if(String($(this).attr('href')).split('/').length === 5){
        temp.push({
          link:$(this).attr('href'),
          letter:(function(thiz) {
            try {
              return String(thiz.attr('href')).split('_')[1][0]
            }
            catch(e) {
              return String(thiz.attr('href')).split('_')[0][0]
            };
          }($(this)))
        });
      }
    });
    processASYNC(
      (function() {
        var links=[];
        for (var i=0; i<10; i++){
          var random = Math.floor(Math.random()*temp.length+1)
          var split = JSON.stringify(temp[random].link);
          var name = split.split('/')[4].replace('.html','');
          console.log('name:', name);
          links.push({
            link: split.replace("\"",'').replace("\"",''),
            name: name.match(/^.+[\w]/)[0]
          })
        }
        return links;
      }())
    );
  });

  function processASYNC(insert) {
    var temp2=[];
    async.each(insert, function(item, callback){
      var url = 'http://www.brainyquote.com' + item.link;

      request(url, function(err, response, body){
        var $ = cheerio.load(body);
        var selector = $('.bqQuoteLink');
        var elLENGTH= selector.get().length;
        var quote = selector.eq(Math.floor(Math.random()*(elLENGTH-1)+1)).text();

        temp2.push({
          name:item.name,
          quote:quote,
          Time:date.getHours() +' : '+ date.getMinutes(),
          Date:moment().format('MMMM Do YYYY'),
          Votes:0
        })
        callback(null);
      });

      try {
        console.log(item.link, '\r');
      }
      catch(e){}
    }, function(err){
      if (err) res.send('error');
      else {
        DailySave.SaveQuoteSQL(pool, temp2);
        //Send back to client here.
        res.send(temp2);
      }
    });
  }
};