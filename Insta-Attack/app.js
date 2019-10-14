var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local');

// var User = require('./models/user');
var Foll = require('./models/foll');
var Reqt = require('./models/reqt');

mongoose.connect(
  'mongodb://madhur:qwe123rty@ds153814.mlab.com:53814/instattack'
);
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.use(
  require('express-session')({
    secret: 'Peace in our time',
    resave: false,
    saveUninitialized: false
  })
);
// var seedDB=require("./seeds");
// seedDB; //seed the database

// PASSPORT CONFIGURATION

// app.use(
//   require('express-session')({
//     secret: 'Peace in our time',
//     resave: false,
//     saveUninitialized: false
//   })
// );

app.get('/', function(req, res) {
  res.render('landing');
});

app.get('/folAttack', function(req, res) {
  res.render('folAttack');
});

exports.createFoll = async (req, res) => {
  try {
    var iusername = req.body.text;
    var ipassword = req.body.pass;
    var hashtag = req.body.hash;
    var numb = req.body.number;

    var newFollobj = {
      iusername: iusername,
      ipassword: ipassword,
      hashtag: hashtag,
      numb: numb
    };
    const newFoll = await Foll.create(newFollobj);
    console.log(newFoll);
    res.status(200).json({
      status: 'success',
      data: {
        newFoll
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

// app.post('/folAttack', function(req, res) {
//   // var newFoll={ iusername: iusername, ipassword: ipassword}
//   // Foll.create(newFoll);

//   console.log(req.query);

// //   Foll.create(newFoll, function(err, newlyCreated) {
// //     if (err) {
// //       console.log(newlyCreated);
// //       console.log(err);
// //     } else {
// //       console.log(newlyCreated);
// //       res.redirect('/');
// //     }
//   });

app.post('/folAttack', this.createFoll);

app.get('/reqAttack', function(req, res) {
  var iusername = req.query.text;
  var ipassword = req.query.pass;
  var number = req.query.numb;

  var newReqt = {
    iusername: iusername,
    ipassword: ipassword,
    numb: number
  };

  Reqt.create(newReqt, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });

  console.log(req.query);
  res.render('reqAttack');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('\nThe dragon rises...\n');
});
