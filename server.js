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
          var temp1=[];

          for (var i=0; i<5; i++){
            var random = Math.floor(Math.random()*temp.length+1)
            var split = JSON.stringify(temp[random].link).split('/')[4];
            split = split.split('.')[0];
            temp1.push(split);
          }
          return temp1;
        }())
    );
  });


  function processASYNC(insert) {
    console.log(insert);
    async.forEach(temp, function(item, callback){
//      console.log(item.link);
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