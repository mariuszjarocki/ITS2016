var bodyParser=require('body-parser');
var server = require('./modules/server.module');
var errorHandling=require('./services/error.service');
var serverRoute=require('./routes/server.route')(server.router,server.config);
var dbInit=require('./helpers/db.init');


process.argv.forEach(function (val, index, array) {
  if(val=='-db'){
    dbInit(server.dbService.mongoose);
  }
});

//server.app.emit('testEmit');
server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({extended:false}));
server.app.use(serverRoute);
server.app.use(errorHandling.handler);
server.app.listen(server.config.port);
