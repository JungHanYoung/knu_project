var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const db = require('./db.js');

var session = require('express-session');

db();

var index = require('./routes/index')
  , member = require('./routes/member')
  , board = require('./routes/board')

var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.set('port', process.env.PORT || 3000)


io.on('connection', function (socket) {
  console.log('user connected')
  socket.on('chat client', function (msg) {
    console.log(msg.nick);
    console.log(msg.message);
    io.emit('chat server', msg)
  })
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//test!!
app.get('/chat', function (req, res) {
  sess = req.session;
  
  res.render('chat', {nick: sess.nick});
});



app.use('/', index);
app.use('/member', member);
app.use('/board', board);

// 라우터에 해당하는 url이 없는 경우
// 로그인 O -> 게시판 목록 창으로 이동 ('/board')
// 로그인 X -> 로그인 창으로 이동/member/loginForm
// app.use(function (req, res, next) {
//   var sess = req.session;
//   if (sess.email) {
//     res.redirect('/board')
//   } else {
//     res.redirect('/member/loginForm')
//   }
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(app.get('port'))

module.exports = app;
