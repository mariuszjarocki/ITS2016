var fs = require('fs');
var dateFormat = require('dateformat');
exports.log = function(logMsg, req) {
    var log = dateFormat(new Date(), 'dd-mm-yyyy HH:mm:ss').toString()
        + '\n-error:' + logMsg + '\n-url:' + req.originalUrl + '\n-host:' + req.headers.host
        + '\n-------------------------------\n\n';
    fs.appendFile("./app.logger.txt", log, function(err) {
        if (err) throw err;
    });
}