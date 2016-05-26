var notification=require('../controllers/notification.controller');
module.exports=function(router){
    var prefix='/notification/';
    router.get(prefix+':id',notification.get);
    router.get('/notifications/',notification.getNotificationsList);
    router.put(prefix+'update/:id',notification.update);
    router.post(prefix+'create',notification.create);
    router.delete(prefix+'remove/:id',notification.remove);
    return router;
}