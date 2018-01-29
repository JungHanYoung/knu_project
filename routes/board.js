var express = require('express');
var router = express.Router();
var boardMediator = require('../models/schema.js');

// 코드 해석
// sort와 find는 커서를 활용했고 1은 오름차순 -1은 내림차순, 카테고리를 조건으로 주고 그 다음은 표시할 것들.
// _id는 자체적으로 index 데이터를 갖고 있다. 따라서 따로 index를 포함하거나 index 도큐먼트를 만들필요가 없음.


router.get('/',function(req,res,next){

        boardMediator.find({}).count(function(err,boardRawCount){
            
            boardMediator.find({}, 'index nick title reg_date', function(err,boardRawData){
                res.render('board',{boardData: boardRawData,boardCount:boardRawCount,page:1});
              }).sort( { "reg_date": -1 } ).limit(10);
        });
});

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