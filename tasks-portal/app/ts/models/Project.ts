module TaskMgrApp.Models {

    export interface Project {
        name: string,
        description: string,
        creationDate: string,
        _creator: User,
        _tasks: Task[],
        _contractors: User[]
    }
}