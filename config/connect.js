const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:shoclefdb@ec2-13-57-231-82.us-west-1.compute.amazonaws.com:27017/shoclef_api');
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));