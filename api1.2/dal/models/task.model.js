var db = require('../../services/db.service');
var ObjectId = db.mongoose.Schema.ObjectId;

var TaskTypeEnum = {
    STANDARD_REQUEST: 0,
    INCIDEND: 1,
    FOR_TESTING: 2
};

var TaskStatusEnum = {
    UNRESOLVED: 0,
    OPEN: 1,
    INPROGRESS: 2,
    CLOSED:3
};

var task = db.mongoose.model('Task', {
    title: String,
    description: String,
    type: Number,
    status: Number,
    creationDate:{type : Date},
    startDate:{type : Date},
    endDate:{type : Date},
    _project: { type: ObjectId, ref: 'Project' },
    _creator: { type: ObjectId, ref: 'User' },
    _contractor: { type: ObjectId, ref: 'User' },
});

module.exports = {
    model: task,
    type: TaskTypeEnum,
    status: TaskStatusEnum
}
