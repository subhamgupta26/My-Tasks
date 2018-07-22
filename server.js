var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')

var index = require('./routes/index');
var users = require('./routes/users');
var tasks = require('./routes/tasks');
var public = require('./routes/public');

var db = require('./db');

var app = express();

var User= require('./models/user');
 var Task= require('./models/task');

var VerifyToken = require('./auth/VerifyToken');




// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['authorization']
};
app.use(cors(corsOption))

app.use('/', index);
app.use('/users',VerifyToken, users);
app.use('/tasks',VerifyToken, tasks);
app.use('/public', public);

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
  res.send({ message :'error' });
});
var port = process.env.API_PORT || 3001;

// app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});


// var awesome_instance = new User({ email: 'admin@gmail.com', password: 'admin', name: 'awesome' });


// var awesome_instance = new Task({ name: 'myNote2', type: 'text2', description: 'my second note'});
// var awesome_instance1 = new Product({ name: 'HTC2', price: '20000', imagePath: 'fileServer/images2.jpg' , productId: 'HTC02'});
// var awesome_instance2 = new Product({ name: 'SAMSUNG1', price: '10000', imagePath: 'fileServer/images3.jpg' , productId: 'SAMSUNG01'});
// var awesome_instance3 = new Product({ name: 'SAMSUNG2', price: '12000', imagePath: 'fileServer/images4.jpg' , productId: 'SAMSUNG02'});
// var awesome_instance4 = new Product({ name: 'HTC3', price: '16000', imagePath: 'fileServer/images5.jpg' , productId: 'HTC03'});
// var awesome_instance5 = new Product({ name: 'ONEPLUS1', price: '30000', imagePath: 'fileServer/images6.jpg' , productId: 'ONEPLUS01'});





// //Save the new model instance, passing a callback
// awesome_instance.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
//   console.log('saved');
// });
// awesome_instance1.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
//   console.log('saved');
// });
// awesome_instance2.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
//   console.log('saved');
// });
// awesome_instance3.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
//   console.log('saved');
// });
// awesome_instance4.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
//   console.log('saved');
// });
// awesome_instance5.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
//   console.log('saved');
// });

module.exports = app;
