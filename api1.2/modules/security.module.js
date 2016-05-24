var jwt = require('jsonwebtoken');
var auth = require('../shadow/auth.config');
var userModel = require('../dal/models/user.model');
module.exports.signIn = function(req, resp, next) {  
    userModel.user.findOne({ email: req.body.email }, function(err, user) {
        if (err) throw err;
        if (!user) {
            resp.status(401).json({ err: 'Authentication failure!' });
        } else {
            if (user.password === req.body.password) {
                user['password'] = undefined;
                console.log('uuid',auth.uuid);
                var token = jwt.sign(user, auth.uuid, { expiresIn: 90000 });
                resp.json({user: user, token: token });
            } else {
                resp.status(401).json({ err: 'Authentication failure!' });
            }
           
        }
    });

};

module.exports.canAccess=function(token){
    var decode=jwt.decode(token,auth.uuid);
    console.log(decode);
    
};