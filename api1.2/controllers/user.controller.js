var user = require('../dal/models/user.model');
var errorService=require('../services/error.service');
var ObjectId = require('../modules/types.module').ObjectId;
var auth=require('../services/security.service');

module.exports={
 //create user
 create:function(req,resp){
     console.log(req.body);
    var _user=new user.model(req.body);
    _user.save(function(err){
      err ? resp.status(500).json({ error: [{ error: err.message  }] }) : resp.status(200).send();
    });
}, 
 //update user
 update:function(req,resp){    
  user.model.findByIdAndUpdate(req.params.id, { $set: req.body}, function (err, user) {
   err ? resp.status(500).json({ error: [{ error: err.message  }] }) : resp.status(200).send();
});},
 //remove user
 remove:function(req,resp){
   user.model.remove({ _id: ObjectId(req.body.id) }, function(err) {
        err ? resp.status(500).json({ error: [{ error: err.message  }] }) : resp.status(200).send();
    });  
 },
 //get user
 get:function(req,resp){
      user.model.find({_id:ObjectId(req.params.id)},function(err,user) {
         err ? resp.status(500).json({ error: [{ error: err.message  }] }) : resp.status(200).json({user:user});
     });
  
 },
 //get users
 getUsersList:function(req,resp){
     user.model.find({},'name email role _tasks _notifications',function(err,users) {
         err ? resp.status(500).json({ error: [{ error: err.message  }] }) : resp.status(200).json({users:users});
     });
 },
 //user signIn
 signIn:auth.signIn
}