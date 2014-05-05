var schedule = require('node-schedule');

module.exports = function() {

  var rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [0, new schedule.Range(0, 7)];
  rule.hour = 2;
  rule.minute = [0, new schedule.Range(0, 60)]

  var j = schedule.scheduleJob(rule, function(){
    console.log('Today is recognized by Rebecca Black!');
  });


}