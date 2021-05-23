let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser')
var cors = require('cors')

let usersRouter = require('./routes/users');
let postsRouter = require('./routes/posts');

require('dotenv').config()

let app = express();

// mongoose connections
let mongoose = require("mongoose");
let dev_db_url = process.env.DB_STRING
mongoose.connect(dev_db_url, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connetion error: "));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/users', usersRouter);
app.use('/posts', postsRouter);


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
  res.send(`<div><h1>${err.message}</h1><h2>${err.status}</h2><pre>${err.stack}</pre></div>`);
  
});

module.exports = app;