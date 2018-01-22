var express = require('express');
var router = express.Router();
var schema = require('../models/schema.js');
// ../models/schema.js
//          vvv
//          vvv
// module.exports = {
//   memberSchema : mongoose.model('member', member),
//   boarderSchema : mongoose.model('boarder', boarder)
// }

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/addmember', function(req, res, next) {
  res.render('addmember', {});
});

router.post('/registermember', function(req, res, next) {
  var member = new schema.memberSchema({
    email: req.body.email,
    password: req.body.password,
    nick: req.body.nick
  });
  member.save(function(err, member){
    if (err) {
      console.error(err);
      res.render('error');
    }
    else {
      console.log(member);
      res.redirect('/welcome');
    }
  });
  // console.log('email is ' + req.body.email);
  // console.log('password is ' + req.body.password);
  // console.log('nick is ' + req.body.nick);
  // res.redirect('/welcome');
});

router.get('/welcome', function(req, res, next) {
  res.render('welcome', {});
})
module.exports = router;
