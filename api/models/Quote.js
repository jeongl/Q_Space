var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  Comments:[{name:String, quote:String, Time:String, Date:String, Votes:Number}]
})

module.exports = mongoose.model('Quote', schema);