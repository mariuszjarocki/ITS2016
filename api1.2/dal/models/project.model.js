var db = require('../../services/db.service');
var ObjectId = db.mongoose.Schema.ObjectId;

var project = db.mongoose.model('Project', {
    name: String,
    description: String,
    creationDate: { type: Date, default: Date.now },
    _creator: { type: ObjectId, ref: 'User' },
    _tasks:[{type:ObjectId,ref:'Task'}],
    _contractors:[{type:ObjectId,ref:'User'}] 
});

module.exports = { model: project };