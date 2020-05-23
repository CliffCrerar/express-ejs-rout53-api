const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const layouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const hostedZoneRouter = require('./routes/hosted-zones.js');


// const jquery = require('jquery');
// const popper = require('popper.js');
// const bootstrap = require('bootstrap');
// console.log('bootstrap: ', bootstrap);
// console.log('jquery: ', jquery);
// console.log('popper: ', popper);


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(layouts);

app.use('/jquery', express.static('./node_modules/jquery/dist/jquery.js'));
app.use('/popper', express.static('./node_modules/popper.js/dist/popper.min.js'));
app.use('/bootstrap', express.static(path.join(__dirname, './node_modules/bootstrap/dist')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(sassMiddleware({
//   src: path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   indentedSyntax: false, // true = .sass and false = .scss
//   sourceMap: true
// }));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hosted-zones', hostedZoneRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
