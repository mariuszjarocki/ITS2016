
var user=require("../controllers/user.controller");
module.exports=function(router,config){
    router.get('/',function(req,resp) {
        resp.status(200).json({message:'Hello from TaskManagerAPI.Server is running on port '+config.port});      
    })
    
    router.post('/signIn',user.signIn);
    router.post('/signOut',function(req,resp) {
        resp.status(200);
    })
    require('../routes/project.route')(router);
    require('../routes/user.route')(router);
    require('../routes/task.route')(router);
    require('../routes/notification.route')(router);
    
    return router;
}
