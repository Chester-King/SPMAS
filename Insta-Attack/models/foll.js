var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var FollSchema = new mongoose.Schema({
  iusername: { type: String, sparse: true, unique: false },
  ipassword: String,
  hashtag: String,
  numb: Number
});

FollSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Foll', FollSchema);
