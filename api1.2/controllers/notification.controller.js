var notification = require('../dal/models/notification.model');
var errorService=require('../services/error.service');
var ObjectId = require('../modules/types.module').ObjectId;

module.exports={
 //create notification
 create:function(req,resp){
    var _notification=new notification.model(req.body);
     _notification.save(function(err){
      err ? resp.status(500).json({ error: [{ error: err.message }] }) : resp.status(200).send();
    });
}, 
 //update notification
 update:function(req,resp){    
  notification.model.findByIdAndUpdate(id, { $set: req.body}, function (err, notification) {
  err ? resp.status(500).json({ error: [{ error: err.message  }] }) : resp.status(200).send();

});},
 //remove notification
 remove:function(req,resp){
   notification.model.remove({ _id: ObjectId(req.body.id) }, function(err) {
          err ? resp.status(500).json({ error: [{ error: err.message  }] }) : resp.status(200).send(); 
    });  
 },
 //get notification
 get:function(req,resp){
      notification.model.find({_id:ObjectId(req.params.id)},function(err,notification) {
        err ? resp.status(500).json({ error: [{ error: err.message  }] }) : resp.status(200).json({notificatin:notification});
     });
  
 },
 //get notifications
 getNotificationsList:function(req,resp){
     notification.model.find({},function(err,notifications) {
         err ? resp.status(500).json({ error: [{ error: err.message  }] }) : resp.status(200).json({notifications:notifications});
     });
 }
}