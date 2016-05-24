var task = require('../dal/models/task.model');
var projectService=require('../services/project.service');
var ObjectId = require('../modules/types.module').ObjectId;
var errorService=require('../services/error.service');

module.exports={
 //create task
 create:function(req,resp){
   var _task=new task.model(req.body);      
     _task.save(function(err){
         projectService.addTaskToProject(_task._id,_task._project,function(taskErr){
             err ? resp.status(500).json({ error: [{ error: err.message  }] }) : resp.status(200).send();
         });
    });
}, 
 //update task
 update:function(req,resp){    
  task.model.findByIdAndUpdate(req.params.id, { $set: req.body}, function (err, task) {
    err ? resp.status(500).json({ error: [{ error: err.message  }] }) : resp.status(200).send();
});},
 //remove task
 remove:function(req,resp){
   task.model.remove({ _id: ObjectId(req.params.taskId) }, function(err) {
       projectService.removeTaskFromProject(req.params.taskId,req.params.projectId,function(taskErr){
             err ? resp.status(500).json({ error: [{ error: err.message  }] }) : resp.status(200).send();
         });
    });  
 },
 //get task
 get:function(req,resp){
      task.model.find({_id:ObjectId(req.params.id)}).then(function(err,task) {
       err ? resp.status(500).json({ error: [{ error: err.message  }] }) : resp.status(200).json({task:task});
          
     });
 },
 //get tasks
 getTasksList:function(req,resp){
   task.model.find({}).populate('_creator _contractor','name email').exec(function(err,tasks) {
     err ? resp.status(500).json({ error: [{ error: err.message }] }) : resp.status(200).json({tasks:tasks});
     });
 },
 
  getTasksByUser:function(req,resp){
     task.model.find({},function(err,tasks) {
     err ? resp.status(500).json({ error: [{ error: err.message  }] }) : resp.status(200).json({tasks:tasks});
     });
 },
 

}