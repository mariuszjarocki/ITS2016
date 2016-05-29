var db = require('../../services/db.service');
var ObjectId = db.mongoose.Schema.ObjectId;

var userRoleEnum = {
    ADMIN: 0,
    DEV: 1
};

var user = db.mongoose.model('User', {
    name: {
        first: String,
        last: String
    },
    email: String,
    password: String,
    role: Number
});

module.exports = {
    model: user,
    role: userRoleEnum
}

