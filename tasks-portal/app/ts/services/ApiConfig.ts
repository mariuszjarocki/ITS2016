module TaskMgrApp.Services{
    export class Config{
        public static ApiRootUrl = "http://localhost:5000/";
        public static TasksGetUrl = TaskMgrApp.Services.Config.ApiRootUrl + 'tasks';
        public static TaskUpdateUrl = TaskMgrApp.Services.Config.ApiRootUrl + '/task/update/'
    }
}