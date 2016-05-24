var db = require('../../services/db.service');
var ObjectId = db.mongoose.Schema.ObjectId;

var notification = db.mongoose.model('Notification', {
    title: String,
    description: String,
    creationDate: {type : Date, default: Date.now },
    _userId: { type: ObjectId, ref: 'User' },

});

module.exports = { model: notification };




