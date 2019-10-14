var mongoose = require('mongoose');

var api1Schema = new mongoose.Schema({
  instaUser: String,
  instaPass: String,
  requests: Number
});

module.exports = mongoose.model('Data1', api1Schema);
