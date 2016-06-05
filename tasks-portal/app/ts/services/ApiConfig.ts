module TaskMgrApp.Services{
    // var Config = {
    //     ApiRootUrl = "http://localhost:5000/",
    //     TasksGetUrl = TaskMgrApp.Services.Config.ApiRootUrl + 'tasks',
    //     TaskUpdateUrl = TaskMgrApp.Services.Config.ApiRootUrl + '/task/update/'
    // }
    export class Config{
        
        public static ApiRootUrl = "http://localhost:5000/";
        public static TasksGetUrl = "http://localhost:5000/tasks";
        public static TaskUpdateUrl = "http://localhost:5000/task/update/"
    }
}