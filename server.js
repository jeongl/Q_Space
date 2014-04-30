var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();
var request        = require('request');
var cheerio        = require('cheerio');
var async          = require('async');

app.use(express.static(__dirname));
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser()); 						// pull information from html in POST
app.use(methodOverride()); 					// simulate DELETE and PUT

app.get('/getQuotes', function(req,res){
  var temp=[];

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
          links.push({
            link: split.replace("\"",'').replace("\"",''),
            name: split.split('/')[4].replace('.html','')
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

        console.log('random Number:', Math.floor(Math.random()*(elLENGTH-0)+0));
        var quote = selector.eq(Math.floor(Math.random()*(elLENGTH-1)+1)).text();
        console.log('quote:', quote);

        temp2.push({
          name:item.name,
          quote:quote
        })
        callback(null);
      })
      try {
        console.log(item.link, '\r');
      }
      catch(e){}
    }, function(err){
      if (err) res.send('error');
      else res.send(temp2);
    });
  }

  var quotes = [
      {
        "Person" : "Unknown",
        "Quote" : "You can't always get what you want!"
      },
      {
        "Person" : 'Unknown',
        "Quote" : "Life is good"
      }
  ];
//  res.send(JSON.parse(body));
})


app.listen(3001);
console.log('Check port 3001');