/// <reference path="task.ts" />
module TaskMgrApp.Models {
    export interface IDropdownItem {
        value: number;
        text: string;
    }

    export var TaskStatusesItems: IDropdownItem[] = [
        { value: TaskStatusEnum.UNRESOLVED, text: "Unresolved" },
        { value: TaskStatusEnum.OPEN, text: "Open" },
        { value: TaskStatusEnum.INPROGRESS, text: "In progress" },
        { value: TaskStatusEnum.CLOSED, text: "Closed" }
    ];

    export var TaskTypesItems: IDropdownItem[] = [
        { value: TaskTypeEnum.STANDARD_REQUEST, text: "Standard request" },
        { value: TaskTypeEnum.INCIDEND, text: "Incidend" },
        { value: TaskTypeEnum.FOR_TESTING, text: "For testing" }
    ];
}