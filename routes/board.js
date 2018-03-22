var express = require('express');
var router = express.Router();
var boardMediator = require('../models/schema.js').boarderSchema;

// 코드 해석
// sort와 find는 커서를 활용했고 1은 오름차순 -1은 내림차순, 카테고리를 조건으로 주고 그 다음은 표시할 것들.
// _id는 자체적으로 index 데이터를 갖고 있다. 따라서 따로 index를 포함하거나 index 도큐먼트를 만들필요가 없음.

// 라우팅 전에 로그인 세션이 있는지 확인!
// 로그인 세션이 없을 경우! 로그인창으로 이동!!
router.use(function(req, res, next){
    var sess = req.session;
    if(sess.email && sess.nick){
        next()
    } else{
        res.redirect('/member/loginForm')
    }
})

router.get('/',function(req,res,next){

        boardMediator.find({}).count(function(err,boardRawCount){
            
            boardMediator.find({}, 'index nick title reg_date', function(err,boardRawData){
                res.render('board',{boardData: boardRawData, boardCount:boardRawCount, page:1});
              }).sort( { "reg_date": -1 } ).limit(10);
        });
});

// 게시판 글작성 폼@@@@@
router.get('/create', function(req, res, next){
    res.render('createBoarder')
});

// 게시판 글작성 처리 코드
router.post('/create', function(req, res, next){
    var sess = req.session
    var board = new boardMediator({
        nick: sess.nick,
        category: req.body.category,
        title: req.body.title,
        contents: req.body.contents,
        reg_date: new Date()
    })
    board.save(function(err, doc) {
        if(err) { throw err }
        console.log(doc);
        res.redirect('/')
    })
})

router.get('/page=:page',function(req,res,next){

    boardMediator.find({}).count(function(err,boardRawCount){
        
        boardMediator.find({}, 'index nick title reg_date', function(err,boardRawData){
            res.render('board',{boardData: boardRawData,boardCount:boardRawCount,page:req.params.page});
          }).sort( { "reg_date": -1 } ).skip(10*(req.params.page-1)).limit(10);
    });
});


 router.get('/category=:category',function(req,res,next){

     boardMediator.find({ "category": req.params.category}).count(function(err,boardRawCount){
        
         boardMediator.find({'category':req.params.category}, 'index nick title reg_date', function(err,boardRawData){
             res.render('board',{boardData: boardRawData,boardCount:boardRawCount,page:1});
           }).sort( { "reg_date": -1 } ).limit(10);
     });
 });

 router.get('/category=:category/page=:page',function(req,res,next){
     boardMediator.find({ "category": req.params.category}).count(function(err,boardRawCount){
        
         boardMediator.find({'category':req.params.category}, 'index nick title reg_date', function(err,boardRawData){
             res.render('board',{boardData: boardRawData,boardCount:boardRawCount,page:req.params.page});
           }).sort( { "reg_date": -1 } ).skip(10*(req.params.page-1)).limit(10);
     });
 });


 router.get('/nick=:nick',function(req,res,next){

     boardMediator.find({"nick": req.params.nick}).count(function(err,boardRawCount){
        
         boardMediator.find({"nick": req.params.nick}, 'index nick title reg_date', function(err,boardRawData){
             res.render('board',{boardData: boardRawData,boardCount:boardRawCount,page:1});
           }).sort( { "reg_date": -1 } ).limit(10);
     });
 });

 router.get('/nick=:nick/page=:page',function(req,res,next){

     boardMediator.find({"nick": req.params.nick}).count(function(err,boardRawCount){
        
         boardMediator.find({"nick": req.params.nick}, 'index nick title reg_date', function(err,boardRawData){
             res.render('board',{boardData: boardRawData,boardCount:boardRawCount,page:req.params.page});
           }).sort( { "reg_date": -1 } ).skip(10*(req.params.page-1)).limit(10);
     });
 });


 router.get('/complex/category=:category&nick=:nick',function(req,res,next){
     boardMediator.find({ "category": req.params.category,"nick": req.params.nick}).count(function(err,boardRawCount){
        
         boardMediator.find({'category':req.params.category,"nick": req.params.nick}, 'index nick title reg_date category', function(err,boardRawData){
             res.render('board',{boardData: boardRawData,boardCount:boardRawCount,page:1});
           }).sort( { "reg_date": -1 } ).limit(10);
     });
 });

 router.get('/complex/category=:category&nick=:nick/page=:page',function(req,res,next){

     boardMediator.find({ "category": req.params.category,"nick": req.params.nick}).count(function(err,boardRawCount){
        
         boardMediator.find({'category':req.params.category,"nick": req.params.nick}, 'index nick title reg_date category', function(err,boardRawData){
             res.render('board',{boardData: boardRawData,boardCount:boardRawCount,page:req.params.page});
           }).sort( { "reg_date": -1 } ).skip(10*(req.params.page-1)).limit(10);
     });
 });

module.exports = router;