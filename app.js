var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var session = require('express-session');
var fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth')
var pictureRouter = require('./routes/pictures');
var errorRouter = require('./routes/error');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'muffin.png')));

// Session
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "dsf46dsf877z32ef13ds21f65ze4f",
    name: "uniqueSessionID",
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: false
}));

//FileUploadHandler
app.use(fileUpload({
    limits: {
        fileSize: 1024 * 1024 * 2 // 1 MB
    },
    abortOnLimit: true
  }));

// Routes
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/images', pictureRouter);
app.use('/error', errorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(res.redirect("/error/404"));
  next(createError(404));
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
