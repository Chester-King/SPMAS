var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var ReqtSchema = new mongoose.Schema({
  iusername: String,
  ipassword: String,
  numb: Number
});

ReqtSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Reqt', ReqtSchema);
