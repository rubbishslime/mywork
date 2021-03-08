var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var login = require('./routes/login');
var square = require('./routes/square');
var forum = require('./routes/forum');
var activity = require('./routes/activity');
var information = require('./routes/information');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', login);
app.use('/square', square);
app.use('/forum', forum);
app.use('/activity', activity);
app.use('/information', information);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //允许所有不同源的地址访问
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //Content-Type必须要设置，Authorization是用户登录注册时存入的token值，可根据需求来设置，还有其他的都需要用逗号隔开
  res.header('Access-Control-Allow-Credentials', true); // 这个必须要设置，否则解决跨域无效，注意true是字符串
  next()
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

module.exports = app;
