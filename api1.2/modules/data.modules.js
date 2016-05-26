
/*obsolete*/ 
var mongoose=require('mongoose');
module.exports.userModel=require('../dal/models/user.model')(mongoose);
module.exports.taskModel=require('../dal/models/task.model')(mongoose);
module.exports.notificationModel=require('../dal/models/notificaion.model')(mongoose);