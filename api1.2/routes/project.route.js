var project=require('../controllers/project.controller');
module.exports=function(router){
    var prefix='/project/';
    router.get(prefix+':id',project.get);
    router.get('/projects/',project.getProjectsList);
    router.put(prefix+'update/:id',project.update);
    router.post(prefix+'create',project.create);
    router.delete(prefix+'remove/:id',project.remove);
    return router;
}