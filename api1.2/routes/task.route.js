var task=require('../controllers/task.controller');
module.exports=function(router){
    var prefix='/task/';
    router.get(prefix+':id',task.get);
    router.get('/tasks/',task.getTasksList);
    router.put(prefix+'update/:id',task.update);
    router.post(prefix+'create',task.create);
    router.delete(prefix+'remove/:projectId/:taskId/',task.remove);
    return router;
}