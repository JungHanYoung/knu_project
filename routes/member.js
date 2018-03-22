var express = require('express');
var router = express.Router();

const schema = require('../models/schema.js')

router.get('/logout', function (req, res, next) {
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

//로그아웃을 제외한 회원관련 url은 session값을 확인..
router.use(function(req, res, next){
  const sess = req.session;
  if(sess.email && sess.nick){
    res.redirect('/');
  } else{
    next()
  }
})

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

// 회원가입 폼
router.get('/registerForm', function(req, res, next){
  res.render('registerForm')
});


// 회원가입처리!!
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
      var sess = req.session;
      sess.email = member.email;
      sess.nick = member.nick;
      res.redirect('/');
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

module.exports = router;
