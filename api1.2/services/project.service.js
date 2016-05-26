var project = require('../dal/models/project.model');
var ObjectId = require('../modules/types.module').ObjectId
module.exports = {
    addTaskToProject: function(taskId, projectId, callbackError) {
        project.model.findByIdAndUpdate(ObjectId(projectId), { $push: { _tasks: { _id: ObjectId(taskId) } } }, { save: true, upsert: true },
            function(err) {
                callbackError(err);
            });
    },
    removeTaskFromProject: function(taskId, projectId, callbackError) {
        project.model.findByIdAndUpdate(ObjectId(projectId), { $pull: { _tasks: ObjectId(taskId) } }, { save: true, upsert: true },
            function(err, data) {
                callbackError(err);
            });
    }
};