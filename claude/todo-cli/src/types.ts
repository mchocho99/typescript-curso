type Status = "pendiente" | "completada"

export enum METHODS {
    "ADD" = "add",
    "LIST" = "list",
    "COMPLETE" = "complete",
    "DELETE" = "delete"
}

export interface Task {
    id : string
    description : string;
    status : Status
}

export enum STATUS {
    "ERROR" = "error",
    "SUCCESS" = "success"
}