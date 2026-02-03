import fs from "fs"
import { Task, STATUS } from "./types"
import { showDataTask } from "./tasks"
import { showMessage } from "./util"

export function add(task : Task) {
    if (fs.existsSync("data/tasks.json")) {
        const file = fs.readFileSync("data/tasks.json", "utf8")
        const data : Task[] = JSON.parse(file)
        data.push(task)

        fs.writeFileSync("data/tasks.json", JSON.stringify(data, null, 2))

        showMessage(STATUS.SUCCESS, "Tarea agregada con exito")
    } else {
        showMessage(STATUS.ERROR, "Hubo un error al agregar la tarea")
    }
}

export function list() {
    if (fs.existsSync("data/tasks.json")) {
        const file = fs.readFileSync("data/tasks.json", "utf8")
        const data : Task[] = JSON.parse(file)
        
        if (data.length > 0) {
            data.forEach((task) => {
                showDataTask(task)
            })
        } else {
            showMessage(STATUS.ERROR, "No hay tareas")
        }
    } else {
        showMessage(STATUS.ERROR, "Hubo un error al listar las tareas")
    }
}

export function complete(id : string) {
    if (fs.existsSync("data/tasks.json")) {
        const file = fs.readFileSync("data/tasks.json", "utf8")
        const data : Task[] = JSON.parse(file)
        let completed = false

        const tasks = data.map((t) => {
            if (t.id === id) {
                completed = true
                t.status = "completada"
            }
            return t
        })

        if (completed) {
            fs.writeFileSync("data/tasks.json", JSON.stringify(tasks, null, 2))
            showMessage(STATUS.SUCCESS, "Tarea completada con exito")
        } else {
            showMessage(STATUS.ERROR, "Hubo un error al completar la tarea")
        }

    } else {
        showMessage(STATUS.ERROR, "Hubo un error al completar la tarea")
    }
}

export function deleteT(id : string) {
    if (fs.existsSync("data/tasks.json")) {
        const file = fs.readFileSync("data/tasks.json", "utf8")
        let data : Task[] = JSON.parse(file)

        const taskIndex = data.findIndex((t) => t.id ===id)

        if (taskIndex !== -1) {
            data.splice(taskIndex, 1)

            fs.writeFileSync("data/tasks.json", JSON.stringify(data, null, 2))
            showMessage(STATUS.SUCCESS, "Tarea eliminada con exito")

        } else {
            showMessage(STATUS.ERROR, "Hubo un error al eliminar la tarea")
        }
        
    } else {
        showMessage(STATUS.ERROR, "Hubo un error al eliminar la tarea")
    }
}