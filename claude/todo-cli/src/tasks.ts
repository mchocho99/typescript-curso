import { Task, METHODS, STATUS } from "./types";
import { add, list, complete, deleteT } from "./storage";
import { showMessage } from "./util";

export function addTasks(description : string) {
    const task : Task = {
        id: Math.floor(Math.random() * 10000).toString(),
        description,
        status: "pendiente"
    }

    add(task)
}

export function validateParameter(param : string | undefined, method : string | undefined) : param is string {
    switch (method) {
        case METHODS.ADD:
            return validateDescription(param)

        case METHODS.COMPLETE:
        case METHODS.DELETE:
            return validateId(param)
    }

    return false
}

function validateDescription(desc : string | undefined) : desc is string {
    console.log(desc)
    if (desc !== undefined && desc !== "") {
        return true
    }

    showMessage(STATUS.ERROR, "Debes ingresar una descripcion")

    return false
}

function validateId(id : string | undefined) : id is string {
    if (id) {
        return true
    }

    showMessage(STATUS.ERROR, "Debes ingresar un id")


    return false
}

export function listTasks() {
    list()
}

export function showDataTask(task : Task) {
    console.log(`n: ${task.id} - ${task.description} - ${task.status}`)
}

export function completeTask(id : string) {
    complete(id)
}

export function deleteTask(id : string) {
    deleteT(id)
}