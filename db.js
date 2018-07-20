var mongoose = require('mongoose');


var mongoDB = 'mongodb://admin:admin123@ds141641.mlab.com:41641/react-comment';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));