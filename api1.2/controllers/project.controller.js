var project = require('../dal/models/project.model');
var errorService=require('../services/error.service');
var auth=require('../services/security.service');
var ObjectId = require('../modules/types.module').ObjectId;

module.exports={
 //create project
 create:function(req,resp){
   var _project=new project.model(req.body);   
     _project.save(function(err){
      err ? resp.status(500).json({ error: [{ error: err.message }] }) : resp.status(200).send();
    });
}, 
 //update project
 update:function(req,resp){    
  project.model.findByIdAndUpdate(req.params.id, { $set: req.body}, function (err, task) {
    err ? resp.status(500).json({ error: [{ error:err.message }] }) : resp.status(200).send();
});},
 //remove project
 remove:function(req,resp){
   project.model.remove({ _id: ObjectId(req.body.id) }, function(err) {
        err ? resp.status(500).json({ error: [{ error: err.message }] }) : resp.status(200).send();
    });  
 },
 //get project
 get:function(req,resp){
      project.model.find({_id:ObjectId(req.params.id)}).then(function(err,task) {
       err ? resp.status(500).json({ error: [{ error: err.message }] }) : resp.status(200).json({task:task});       
     });
 },
 //get projects
 getProjectsList:function(req,resp){
     project.model.find({}).populate('_creator','name email').exec(function(err,projects) {
     err ? resp.status(500).json({ error: [{ error: err.message }] }) : resp.status(200).json({projects:projects});
     });
 },
 
 //remove task from project
 

}