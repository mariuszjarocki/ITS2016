

module TaskMgrApp.Models {

    export enum UserRoleEnum {
        ADMIN = 0,
        DEV = 1
    };

    export interface User {
        _id: string;
        name: {
            first: string,
            last: string
        },
        email: string,
        password: string,
        role: number,
        _tasks: Models.Task[],
        _notifications: any[]
    }
}