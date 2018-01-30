var express = require('express');
var router = express.Router();

const schema = require('../models/schema.js')

// 로그인페이지!!
router.get('/loginForm', function(req, res, next) {
  // loginForm.ejs 렌더링 
  res.render('loginForm')
});

// 로그인 처리!!
//----- 이메일에 해당하는 데이터가 있는 지 확인..
//------- 있다면 데이터를 가져와 패스워드 체크
//---------- 틀릴경우 err, 맞을 경우 session값을 저장하고 '/'로 리다이렉트
router.post('/login', function(req, res, next){
  schema.memberSchema.findOne({email: req.body.email})
    .then(doc =>{
      if(doc.password === req.body.password){
        sess = req.session
        sess.email = doc.email
        sess.nick = doc.nick
        res.redirect('/')
      }
    })
    .catch(err =>{
      throw err
    })
})

router.get('/addForm', function(req, res, next){
  // addForm.ejs 렌더링 
  res.send('add Form')
});

router.post('/register', function (req, res, next) {
  var member = new schema.memberSchema({
    email: req.body.email,
    password: req.body.password,
    nick: req.body.nick
  });
  member.save(function (err, member) {
    if (err) {
      console.error(err);
      res.render('error');
    }
    else {
      console.log(member);
      res.redirect('/member/welcome');
    }
  });
  // console.log('email is ' + req.body.email);
  // console.log('password is ' + req.body.password);
  // console.log('nick is ' + req.body.nick);
  // res.redirect('/welcome');
});

router.get('/welcome', function (req, res, next) {
  console.log(req.session.email)
  res.render('welcome', { message: req.session.email });
})

router.get('/logout', function(req, res, next) {
  var sess = req.session;
  if (sess.email) {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    })
  } else {
    res.redirect('/');
  }
})

module.exports = router;
