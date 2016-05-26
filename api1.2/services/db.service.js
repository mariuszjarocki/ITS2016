var mongoose = require('mongoose');
var config = require('../config/config');
var alerts=require('../env/internalAlerts');
var dbConfig = config().mongodb;

mongoose.connect(dbConfig.host);
mongoose.connection.on('error', function() {
    console.log(alerts.internalAlerts.dbConnectionError.message);
});

mongoose.connection.on('connected', function() {
    console.log(alerts.internalAlerts.connectionSuccess.message);
});


module.exports.mongoose = mongoose;