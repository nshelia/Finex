const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const config = require('./config');
mongoose.connect(config.database,err => {
	if (err) throw err;
})
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.use((req,res,next) => {
  res.locals.user_firstname = req.session.firstname;
  next();
})
app.set('views',__dirname + '/views');
app.set('view engine','pug');
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));


//routes
const platform = require('./routes/platform');
const ajax = require('./routes/ajax');
app.use('/',platform);
app.use('/ajax',ajax);

app.use((req, res, next) => {
  var err = new Error('Page not found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);