var mongoose = require('mongoose');

var api2Schema = new mongoose.Schema({
  instaUser: String,
  instaPass: String,
  hashtag: String,
  requests: Number
});

module.exports = mongoose.model('Data2', api2Schema);
