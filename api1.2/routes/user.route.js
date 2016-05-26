var user=require('../controllers/user.controller');
var securityService=require('../services/security.service')


module.exports=function(router){
    var prefix='/user/';
    router.get(prefix+':id',user.get);
    router.get('/users/',user.getUsersList);
    router.put(prefix+'update/:id',user.update);
    router.post(prefix+'create',user.create);
    router.post(prefix+'create',user.create);
    router.delete(prefix+'remove/:id',user.remove);
    return router;
}
