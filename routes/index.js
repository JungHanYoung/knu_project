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
  var sess = req.session;
  if(sess.email) {
    res.redirect('/board')
  } else{
    res.redirect('/member/loginForm')
  }
});

router.get('/boarderFrom', function(req, res, next){
  res.render('createBoarder', {});
});

router.get('/detailBoarder/:_id', function(req, res, next){
  var Boarder = schema.boarderSchema;
  Boarder.findOne({_id: req.params._id}, function(err, doc){
    if(err) res.status(500).send({success: false});
    else {
      console.log(doc);
      res.render('detailBoarder', {boarder: doc});
    }
  })
})

router.post('/createBoarder', function(req, res, next){
  var Boarder = schema.boarderSchema;
  var boarder = new Boarder({
    nick: "jhy",
    category: "common",
    title: req.body.title,
    contents: req.body.contents
  });
  boarder.save(function (err, result) {
    if (err) return console.error(err);
    console.dir(result);
    res.redirect('/')
  })
})

module.exports = router;
