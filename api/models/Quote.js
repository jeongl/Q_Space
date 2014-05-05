var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  Date:String,
  Time:String,
  Comments:[{name:String, quote:String, Time:String, Date:String, Votes:Number}]
})

module.exports = mongoose.model('Quote', schema);