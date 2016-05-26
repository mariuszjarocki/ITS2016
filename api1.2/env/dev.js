var port = 5000;
module.exports= {
    port: port,
    success: function() {
        console.log('Server is running on port ' + port);
    },
    error: function() {
        console.log('Server error');
    },
    mongodb: {
        host: 'mongodb://127.0.0.1/dbTaskManager',
        charset: 'utf-8',
        user: 'usr_admin',
        pwd: 'test',
        roles: ['readWrite', 'dbAdmin']
    }
}