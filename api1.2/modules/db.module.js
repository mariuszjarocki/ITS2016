var mongoose = require('mongoose');
var config = require('../config/config');
var dbConfig = config().mongodb;

mongoose.connect(dbConfig.host);

mongoose.connection.on('error', function() {
    console.log('db connection error...');
});

mongoose.connection.on('connected', function() {
    console.log('operation success...');
});


module.exports.mongoose = mongoose;