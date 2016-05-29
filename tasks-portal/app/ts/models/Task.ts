module TaskMgrApp.Models {
    export interface Task {
        _id: string,
        title: string,
        description: string,
        type: number,
        status: number,
        creationDate: Date,
        startDate: Date,
        endDate: Date,
        _project: any,
        _creator: string,
        _contractor: string,
        __v: number
    }
    
    export enum TaskTypeEnum {
        STANDARD_REQUEST = 0,
        INCIDEND = 1,
        FOR_TESTING = 2
    };

    export enum TaskStatusEnum {
        UNRESOLVED = 0,
        OPEN = 1,
        INPROGRESS = 2,
        CLOSED = 3
    };
}